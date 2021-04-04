'use strict';

var URL_BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const elFiles = document.getElementById('files');
const elTxtArea = document.getElementById('txtarea');
const elTable = document.getElementById('show_table');
const elLinks = document.querySelector('#links');


function hideDropping() {
        elDrop.classList.remove('dropover');
}

function showFiles(files) {
        elFiles.innerHTML = '';

        for (var i = 0, l = files.length; i < l; i++) {
                var file = files[i];
                var elFile = buildElFile(file);
                elFiles.appendChild(elFile);
        }
}

function buildElFile(file) {
        var elFile = document.createElement('li');

        var text = file.name + ' (' + file.type + ',' + file.size + 'bytes)';
        elFile.appendChild(document.createTextNode(text));

        if (file.type.indexOf('image/') === 0) {
                var elImage = document.createElement('img');
                elImage.src = URL_BLANK_IMAGE;
                elFile.appendChild(elImage);

                attachImage(file, elImage);
        } else {
                load_textfile(elTxtArea, file);
        }

        return elFile;

        function attachImage(file, elImage) {
                var reader = new FileReader();
                reader.onload = function (event) {
                        var src = event.target.result;
                        elImage.src = src;
                        elImage.setAttribute('title', file.name);
                };
                reader.readAsDataURL(file);
        }

        function escapeHtml(source) {
                var el = document.createElement('div');
                el.appendChild(document.createTextNode(source));
                var destination = el.innerHTML;
                return destination;
        }
}


// for load text file 
/**
 * ファイル読み込み
 * @param targetFile
 * @returns {Promise<unknown>}
 */
function load_textfile(elTxtArea, targetFile) {

        return new Promise((resolve, reject) => {

                fnameSpan.textContent = `${targetFile.name}(${targetFile.size}Bytes)  <${targetFile.type}>`;
                encSpan.textContent = "";
                elTxtArea.textContent = "";

                let encode = null;

                const reader = new FileReader();

                reader.onload = () => {

                        const u8 = new Uint8Array(reader.result);

                        const encNames = ["UTF16", "ASCII", "JIS", "UTF8", "EUCJP", "SJIS", "UNICODE"];

                        const enc = Encoding.detect(u8);
                        encSpan.textContent = enc;

                        if (encNames.indexOf(enc) < 0) {
                                elTxtArea.textContent = "ドロップされたファイルはテキストファイルでない可能性があります。";
                        } else {
                                let content = Encoding.codeToString(Encoding.convert(u8, "UNICODE"));
                                // show at text area
                                showText(elTxtArea, content);

                        }

                        resolve(true);
                };
                reader.onerror = () => {
                        elTxtArea.textContent = reader.error.message;
                        resolve(false);
                };

                reader.readAsArrayBuffer(targetFile);
        });
};

/**
 * text(CSVdata)を表示する
 * @param   content // CSVテキストデータ
 * @returns json_array[]
 */
function showText(el, content) {
        el.textContent = content;
        // console.log(content);
        // console.log(csv2array(content));
        // showAsTable(elTable, csv2array(content));
        // console.log(csv2obarray(content));
        // console.log(JSON.stringify(csv2obarray(content)));
        elLinks.innerHTML = "";
        showAsLinks(elLinks, csv2obarray(content));
}

// linkのテーブルとして表示
function showAsLinks(eltarget, obArray) {
        let _arrayElms = [];
        let _categories = [];

        obArray.forEach(ob => { _arrayElms.push(ob.category); });
        // console.log(_arrayElms);
        _categories = _uniq(_arrayElms);
        // console.log(_categories);

        _categories.forEach(function (_cate) {
                let _find_arr = obArray.filter(function (o) { return o.category === _cate });
                // console.log(`category(${_cate}) ${_find_arr}`);
                let _add_category = document.createElement('ul');
                let _add_category_item = document.createElement('li');
                let _add_category_child = document.createElement('ul');
                _add_category_item.textContent = _cate + "（" + _find_arr.length + "社）";
                _add_category_item.className = "item_category acd-label";
                _add_category_child.className = "item_childs acd-content";
                _add_category.appendChild(_add_category_item);
                _add_category.appendChild(_add_category_child);
                eltarget.appendChild(_add_category);
                for (let i = 0; i < _find_arr.length; i++) {
                        // console.log(_find_arr[i]);
                        let _ob = _find_arr[i];
                        // console.log("Object : ", _ob);
                        appendObject(_add_category_child, _ob);
                }

                _add_category_item.addEventListener('click', function toggle_openclose_child(e) {
                        _add_category_child.classList.toggle('acd-open');
                });
        });

        function _uniq(array) {
                const knownElements = {};
                const uniquedArray = [];
                for (let i = 0, maxi = array.length; i < maxi; i++) {
                        if (array[i] in knownElements)
                                continue;
                        uniquedArray.push(array[i]);
                        knownElements[array[i]] = true;
                }
                return uniquedArray;
        };

        function appendObject(parent, _ob) {
                // create Atag
                let _atag = document.createElement('a');
                _atag.href = _ob.url;
                _atag.innerHTML = _ob.name;
                _atag.target = "_blank";
                // console.log(_atag);
                appendItems(parent, _atag);
        }
        function appendItems(parent, child_el) {
                let _elList = document.createElement('li');
                _elList.appendChild(child_el);
                parent.appendChild(_elList);
        }


}


// refer to qiita for show CSV file
// URL : https://qiita.com/hiroyuki-n/items/5786c8fc84eb85944681
/**
 * text(CSVdata)のArrayデータへの変換（１行目が項目データ変換）
 * @param   content // CSVテキストデータ
 * @returns json_array[]
 */
function csv2array(csvdata) {
        // convert CSV format to array
        let dataArray = []; //配列を用意
        let dataString = csvdata.split('\n'); //改行で分割
        for (let i = 0; i < dataString.length; i++) { //あるだけループ
                dataArray[i] = dataString[i].split(',');
        }
        console.log(dataArray);
        return dataArray;
}

/**
 * ArrayデータをTable要素へ変換
 * @param   content // CSVテキストデータ
 * @returns json_array[]
 */
function showAsTable(el, dataArray) {
        // make HTML elements
        let insertElement = ''; //テーブルタグに表示する用の変数
        dataArray.forEach((element) => { //配列の中身を表示
                insertElement += '<tr>';
                element.forEach((childElement) => {
                        insertElement += `<td>${childElement}</td>`
                });
                insertElement += '</tr>';
        });
        el.innerHTML = insertElement; // 表示
        // return insertElement; 
}

// appendix conver CSV to Object Array
// refer to https://shanabrian.com/web/javascript/csv-to-json.php
/**
 * ArrayデータのJSON配列への変換（１行目が項目データ変換）
 * @param   content // CSVテキストデータ
 * @returns json_array[]
 */
function csv2obarray(content) {
        let jsonArray = [];
        let csvArray = content.split('\n');
        // 1行目から「項目名」の配列を生成する
        let split_items = csvArray[0].split(',');
        let items = []
        split_items.forEach(_split_item => { items.push(_split_item.trim()) });

        // CSVデータの配列の各行をループ処理する
        //// 配列の先頭要素(行)は項目名のため処理対象外
        //// 配列の最終要素(行)は空のため処理対象外
        for (let i = 1; i < csvArray.length - 1; i++) {
                var a_line = new Object();
                // カンマで区切られた各データに分割する
                var csvArrayD = csvArray[i].split(',');
                //// 各データをループ処理する
                for (var j = 0; j < items.length; j++) {
                        // 要素名：items[j]
                        // データ：csvArrayD[j]
                        a_line[items[j]] = csvArrayD[j].trim();
                }
                jsonArray.push(a_line);
        }
        //console.debug(jsonArray);
        return jsonArray;
}


// URLを与えられて、表示をする。
function load_fr_url(url) {
        load_textfile(elTxtArea, url);
}