    <script>
      if (window.msCrypto) {
        $('#alert-ie').show();

        $(window).on('scroll', function (e) {
          if ($(window).scrollTop() > 0) {
            $('#alert-ie').hide();
          } else {
            $('#alert-ie').show();
          }
        });
      }
    </script>