'use strict';

var url_user = 'https://api.github.com/users/' + github_user,
    url_repos = url_user + '/repos?sort=pushed&per_page=100',
    months_short = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

var github_user = new Vue({
    el: '#github-user',
    data: {
        languages: [],
        most_issues: [],
        repos: [],
        response: {},
        sort_orders: {},
        sort_key: 'name',
        user: null
    },
    computed: {
        // Only repos the user actually pushed at, i.e. no forks with no user commits.
        repos_pushed: function repos_pushed() {
            return this.repos.filter(function (d) {
                return d.pushed_at > d.created_at;
            });
        }
    },
    filters: {
        formatDate: function formatDate(value) {
            var dt = new Date(value);
            return dt.getDate() + ' ' + months_short[dt.getMonth()] + ' ' + (dt.getYear() + 1900);
        }
    },
    created: function created() {
        this.fetchRepos();
        this.fetchUser();
    },
    methods: {
        fetchRepos: function fetchRepos() {
            var _this = this;

            this.$http.get(url_repos).then(function (response) {
                _this.response.repos = response;
                _this.repos = response.body;
                _this.procRepos();
            });
        },
        fetchUser: function fetchUser() {
            var _this2 = this;

            this.$http.get(url_user).then(function (response) {
                _this2.response.user = response;
                _this2.user = response.body;
            });
        },
        order: function order(key) {
            // asc is default, because sort orders are initially unset
            return this.sort_orders[key] < 0 ? 'dsc' : 'asc';
        },
        procRepos: function procRepos() {
            this.languages = d3.nest().key(function (d) {
                return d.language;
            }).rollup(function (leaves) {
                return leaves.length;
            }).entries(this.repos_pushed);
            this.most_issues = this.repos_pushed.sort(function (a, b) {
                return b.open_issues_count - a.open_issues_count;
            });
        },
        sortBy: function sortBy(key) {
            var _this3 = this;

            var type = arguments.length <= 1 || arguments[1] === undefined ? 'number' : arguments[1];

            var default_value = type === 'string' ? '' : 0;
            this.sort_key = key;
            this.sort_orders[key] = (this.sort_orders[key] || 1) * -1;
            this.repos.sort(function (a, b) {
                var x = a[key] || default_value,
                    y = b[key] || default_value;
                if (type === 'string') {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }
                return (x === y ? 0 : x > y ? 1 : -1) * _this3.sort_orders[key];
            });
        }
    }
});