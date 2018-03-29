;(function () {
    'use strict';

    // console.log('$', $)
    // store.set('user','哈哈哈')
    // var user = store.get('user')
    // console.log('user', user)

    var $form_add_task = $('.add-task')
        , $delete_task
        , task_list = []
    ;

    init();

    function listen_task_delete() {
        $delete_task.on('click', function () {
            var $this = $(this);
            var $item = $this.parent().parent();
            var index = $item.data('index');
            var tmp = confirm('确定删除?');
            tmp ? delete_task(index) : null;
        });
    }


    $form_add_task.on('submit', function (e) {
        var new_task = {}, $input;
        /*禁用默认行为*/
        e.preventDefault();
        /*获取新Task的值*/
        $input = $(this).find('input[name=content]');
        new_task.content = $input.val();
        if (!new_task.content) return;
        if (add_task(new_task)) {
            // render_task_list();
            $input.val(null)
        }
    });

    function add_task(new_task) {
        task_list.push(new_task);
        refresh_task_list();
        // console.log('task_list', task_list);
        return true;
    }

    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list();
    }

    function delete_task(index) {
        if (index === undefined || !task_list[index]) return;

        delete task_list[index];
        refresh_task_list();
    }

    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }

    function render_task_list() {
        var $task_list = $('.task-list');
        $task_list.html('');
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_item(task_list[i], i);
            $task_list.append($task)
        }

        $delete_task = $('.action.delete');
        listen_task_delete();
    }

    function render_task_item(data, index) {
        if (!data || !index)
            return;
        var list_item_tpl =
            '<div class="task-item" data-index="' + index + '">' +
            '<span><input type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="fr">' +
            '<span class="action delete">删除&nbsp;</span>' +
            '<span class="action">详细</span>' +
            '</span>' +
            '</div>';
        return $(list_item_tpl);
    }
})();
