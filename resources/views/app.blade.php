<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <link rel="stylesheet" href="{{mix('css/app.css')}}">
</head>

<body>
    <div id="root"></div>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <script src="{{mix('js/index.js')}}"></script>
</body>

</html>
