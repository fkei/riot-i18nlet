<spec>

  <!--  riot program output -->
  <h1>riot-i18nlet program output</h1>
  <h2>Langage English:</h2>
  <span>{ description.en }</span>
  <h2>Langage Japanese:</h2>
  <span>{ description.ja }</span>

  <!--  riot custom tag  -->
  <h1>riot-i18nlet custom tag output</h1>
  <h2>Langage English:</h2>
  <riot-i18nlet context="hello" vals="{ {name: 'fkei'} }" />

  <h2>Langage Japanese:</h2>
  <riot-i18nlet context="hello" vals="{ {name: 'fkei'} }" options="{ { ref: false, langage: 'ja' } }" />

  <button click="{ click }">riot tag update!</button>

  <script>

    this.click = function (e) {
      e.preventUpdate = true;
      this.update();
    }

    this.description = {};
    this.description.en = this.i('hello', {name: 'fkei'}, {ref: true})
    this.description.ja = this.i('hello', {name: 'fkei'}, {ref: true, langage: 'ja'})
  </script>

</spec>
