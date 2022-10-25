lina\_dicto for webextension
====  
\- Dictionary of Esperanto to Japanese for web browser -
  
# About
lina\_dicto for webextension は、ブラウザ上でEsperantoの単語の上にマウスオーバーすると、日本語翻訳をホバー表示(ツールチップ表示)するブラウザ拡張です。  
FireFox,Chromeに対応しています。  
   
<img src="document/image/20171117_hover.png" width="200">
<img src="document/image/20171117_popup_menu.png" width="200">
  
# Install
## FireFox
[Firefox Add-ons][firefox]  
または、  
- zipファイルを[Download][Download]する。  
- FireFoxの拡張機能から「一時的なアドオンを読み込む」でダウンロードしたzipファイルを指定する。  
## Chrome
Chromeエクステンションとして公開予定。  
または、  
- zipファイルを[Download][Download]する。  
- zipファイルを解凍。  
- Chromeの拡張機能から「パッケージ化されていない拡張機能を読み込む」で解凍したディレクトリを指定する。  

  
## その他のバージョン
[lina\_dicto (for Win/MacOSX/Linux)](https://github.com/MichinariNukazawa/lina_dicto)  
[lina\_dicto for android](https://github.com/MichinariNukazawa/lina_dicto_for_android)  
  
## License
Clause-2 BSD License  
Exclude dictionary data.(辞書ファイルは辞書ファイル毎のライセンスに準じます)  
  
# 開発に参加する
## Build
リリース： `make`  
Chromeの開発もリリースで生成されるディレクトリで行います。  

## Test
拡張をインストールしなくても動作する[テストページ](http://michinarinukazawa.github.io/lina_dicto_for_webextension/test/index.html)で、翻訳表示を試すことができます。  
  
# Contact
mail: [michinari.nukazawa@gmail.com][mailto]  
twitter: [@MNukazawa][twitter]  
  
Develop by Michinari.Nukazawa, in project "[daisy bell][pixiv_booth_project_daisy_bell]".  
  
[firefox]: https://addons.mozilla.org/ja/firefox/addon/lina_dicto_for_webextension/
[download]: https://github.com/MichinariNukazawa/lina_dicto_for_webextension/releases
[pixiv_booth_project_daisy_bell]: https://daisy-bell.booth.pm/
[mailto]: mailto:michinari.nukazawa@gmail.com
[twitter]: https://twitter.com/MNukazawa
