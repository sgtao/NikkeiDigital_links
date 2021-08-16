// ========================================================
// スクロールでトップに戻るボタンを表示
// refer : https://rfs.jp/sb/javascript/js-lab/brn-backtotop.html  
//=========================================================
function init_page_top(el){

  // スクロールして何ピクセルでアニメーションさせるか
  var px_change = 100;
  // スクロールのイベントハンドラを登録
  window.addEventListener('scroll', function(e) {
    // 変化するポイントまでスクロールしたらクラスを追加
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if ( scrollTop > px_change ) {
      el.classList.add( "fadein" );
  
    // 変化するポイント以前であればクラスを削除
    } else {
      el.classList.remove( "fadein" );
    }
  });
  
  el.addEventListener('click', function(e) {
    anime.remove("html, body");
    anime({
      targets: "html, body",
      scrollTop: 0,
      dulation: 600,
      easing: 'easeOutCubic',
    });
    return false;
  });
}

