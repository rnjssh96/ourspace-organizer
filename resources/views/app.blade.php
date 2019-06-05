<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
        <title></title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <!-- Font Awesome -->
        <script src="https://kit.fontawesome.com/5732b3fc1a.js"></script>

        <!-- Google Maps API -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQKkNsepBOaIiSSp4OUIFZGKmCOFTrho4"></script>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
