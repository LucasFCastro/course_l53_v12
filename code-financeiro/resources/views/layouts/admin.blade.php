<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
    <link href="{{ asset('css/sweetalert.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app">

        <header>
            @if (Auth::check())
                <?php
                $menuConfig = [
                    'nameApp' => 'Code Financeiro Admin',
                    'nameUser' => Auth::user()->name,
                    'menus' =>[
                        [
                            'name' => 'Bancos',
                            'url' => route('admin.banks.index'),
                            'menuId' => ''
                        ],
                        [
                            'name' => 'Contas a pagar',
                            'url' => '/home',
                            'menuId' => 'bill-pay',
                            'menusDropdown' => [
                                [
                                    'name' => 'Criar Conta',
                                    'url' => '/bill-pay/create'
                                ],
                                [
                                    'name' => 'Listar Conta',
                                    'url' => '/home'
                                ]
                            ]
                        ],
                        [
                            'name' => 'Contas a receber',
                            'url' => '/home',
                            'menuId' => 'bill-receive',
                            'menusDropdown' => [
                                [
                                    'name' => 'Criar Conta',
                                    'url' => '/home'
                                ],
                                [
                                    'name' => 'Listar Conta',
                                    'url' => '/home'
                                ]
                            ]
                        ],
                    ],
                    'urlLogout' => env('URL_ADMIN_LOGOUT'),
                    'csrfToken' => csrf_token()
                ];
                ?>
                <admin-menu :config="{{ json_encode($menuConfig) }}"></admin-menu>
            @endif
        </header>

        <main>
            @yield('content')
        </main>

        <footer class="page-footer" style="padding-top: 0px;">
            <div class="footer-copyright">
                <div class="container">
                    © 2014 Copyright Lucas Castro
                    <a class="grey-text text-lighten-4 right" href="#!">Lucas Castro System</a>
                </div>
            </div>
        </footer>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('build/admin.bundle.js') }}"></script>
</body>
</html>
