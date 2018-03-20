<riot-i18nlet class="{ opts.class }" style="{ opts.style }">
  <span>{ message }</span>
  <script>
    this.message = this[this.riotI18nlet.settings.getMessageFunctionName](opts.context, opts.vals, opts.options);

    this.on('update', function () {
      this.message = this[this.riotI18nlet.settings.getMessageFunctionName](opts.context, opts.vals, opts.options);
    });
  </script>
</riot-i18nlet>
