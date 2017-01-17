// “部门也是以模块形式存在的”

angular.module('Ctrls', [])

// 导航
.controller('NavsController', ['$scope', function($scope) {

    // 通常情况左侧导航的数据会来自于后端
    // $http({
    // 	url: '',
    // }).success(function (info) {
    // 	$scope.navs = info;
    // });

    // 假如导航是固定不变的就没有必要再发请求了
    // 可用数组进行模拟

    var navs = [
        { text: '今日一刻', link: '#/today', icon: 'icon-home' },
        { text: '往期内容', link: '#/older', icon: 'icon-file-empty' },
        { text: '热门作者', link: '#/author', icon: 'icon-pencil' },
        { text: '栏目浏览', link: '#/category', icon: 'icon-menu' }
        // {text: '我的喜欢', link: '#/favorite', icon: 'icon-heart'},
        // {text: '设置', link: '#/settings', icon: 'icon-cog'},
    ];

    // 模型数据
    $scope.navs = navs;

}])

// 今日一刻
.controller('TodayCtrl', ['$scope', '$http', '$rootScope', '$filter', function($scope, $http, $rootScope, $filter) {
        $rootScope.title = "今日一刻";
        $rootScope.loaded = true;
        $rootScope.current = 0;
        // var today = new Date();
        // today = $filter('date')(today, 'yyyy-MM-dd');
        // console.log(today);
        // 获得数据
        if ($rootScope.load) {
            //$rootScope.Url+'/today.php'
            // https://github.com/xingshijun/Time.github.io/blob/master/
            $http.get('/today'
                // params: {today: today}
            ).success(function(info) {
                // console.log(info);
                // 将获得的数据放到模型上
                $rootScope.load = false;
                $rootScope.info = info;
                $scope.posts = info.posts;
                $rootScope.posts = info.posts;
                $scope.date = info.date;
                $rootScope.date = info.date;
                $rootScope.loaded = false;
                $scope.read = function(index) {
                    location.hash = "#/content";
                    $rootScope.conIdx = index;
                    $rootScope.htmlStr = info.posts[$rootScope.conIdx].content;
                }

            });
        } else {
            $scope.posts = $rootScope.posts;
            $scope.date = $rootScope.date;
            $rootScope.loaded = false;
            $scope.read = function(index) {
                location.hash = "#/content";
                $rootScope.conIdx = index;
                $rootScope.htmlStr = $rootScope.info.posts[$rootScope.conIdx].content;
            }
        }


    }])
    // 往期内容
    .controller('OldCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
        $rootScope.title = "往期内容";
        $rootScope.loaded = true;
        $rootScope.current = 1;
        $rootScope.day = -1;
        $scope.result = [];
        // 获得数据
        $scope.older = function() {
            $http({
                //$rootScope.Url + '/older.php'
                url: '/older',
                // params: { older: $rootScope.day-- }
            }).success(function(info) {
                $scope.result.push(info);
                var btn = document.querySelectorAll(".more");
                for (var i = 0; i < btn.length; i++) {
                    if (i == btn.length) {
                        return;
                    }
                    btn[i].remove();
                }
                // 将获得的数据放到模型上
                // $scope.posts += $rootScope.result.posts;
                $scope.date = info.date;
                $rootScope.loaded = false;
            });

        }
        $scope.older()
    }])
    .controller('AuthorCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
        $rootScope.title = "热门作者";
        $rootScope.loaded = true;
        $rootScope.current = 2;
        // 获得数据
        $http({
            url: '/author'
        }).success(function(info) {
            // 将获得的数据放到模型上
            $scope.recAuthors = info.rec.authors;
            $scope.allAuthors = info.all.authors;
            $rootScope.loaded = false;
        });
    }])
    .controller('CategoryCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
        $rootScope.title = "栏目浏览";
        $rootScope.loaded = true;
        $rootScope.current = 3;
        // 获得数据
        $http({
            url: '/category'
        }).success(function(info) {
            // 将获得的数据放到模型上
            $scope.columns = info.columns;
            $rootScope.loaded = false;

        })

    }])
    .controller('ContentCtrl', ['$scope', '$http', '$rootScope', '$sanitize', function($scope, $http, $rootScope, $sanitize) {
        $scope.htmlStr = $rootScope.htmlStr;
    }])