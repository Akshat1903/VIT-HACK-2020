async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/contacts';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';
    let primary_html = '';
    users.data.contacts.regional.forEach(user => {
        let htmlSegment = `<tr>
                            <td>${user.loc}</td>
                            <td>${user.number}</td>
                          </tr>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.table_section');
    container.innerHTML = html;
}

renderUsers();

window.setTimeout(default_index, 1000);
window.setTimeout(getPagination('#table-id'), 1500);

$('#maxRows').trigger('change');

function getPagination(table) {

    $('#maxRows').on('change', function() {
        $('.pagination').html('');
        var trnum = 0;
        var maxRows = parseInt($(this).val());

        var totalRows = $(table + ' tbody tr').length;
        $(table + ' tr:gt(0)').each(function() {
            trnum++;
            if (trnum > maxRows) {

                $(this).hide();
            }
            if (trnum <= maxRows) {
                $(this).show();
            }
        });
        if (totalRows > maxRows) {
            var pagenum = Math.ceil(totalRows / maxRows);
            for (var i = 1; i <= pagenum;) {
                $('.pagination').append('<li data-page="' + i + '">\
								      <span>' + i++ + '<span class="sr-only">(current)</span></span>\
								    </li>').show();
            }
        }
        $('.pagination li:first-child').addClass('active');

        showig_rows_count(maxRows, 1, totalRows);

        $('.pagination li').on('click', function(e) {
            e.preventDefault();
            var pageNum = $(this).attr('data-page');
            var trIndex = 0;
            $('.pagination li').removeClass('active');
            $(this).addClass('active');

            showig_rows_count(maxRows, pageNum, totalRows);

            $(table + ' tr:gt(0)').each(function() {
                trIndex++;
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function loadPagination(table) {

    $('.pagination').html('');
    var trnum = 0;
    var maxRows = 10;
    var totalRows = $(table + ' tbody tr').length;
    $(table + ' tr:gt(0)').each(function() {
        trnum++;
        if (trnum > maxRows) {
            $(this).hide();
        }
        if (trnum <= maxRows) {
            $(this).show();
        }
    });
    if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows);
        for (var i = 1; i <= pagenum;) {
            $('.pagination').append('<li data-page="' + i + '">\
								      <span>' + i++ + '<span class="sr-only">(current)</span></span>\
								    </li>').show();
        }
    }
    $('.pagination li:first-child').addClass('active');
    showig_rows_count(maxRows, 1, totalRows);

    $('.pagination li').on('click', function(e) {
        e.preventDefault();
        var pageNum = $(this).attr('data-page');
        var trIndex = 0;
        $('.pagination li').removeClass('active');
        $(this).addClass('active');
        showig_rows_count(maxRows, pageNum, totalRows);
        $(table + ' tr:gt(0)').each(function() {
            trIndex++;
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
}

function showig_rows_count(maxRows, pageNum, totalRows) {
    var end_index = maxRows * pageNum;
    var start_index = ((maxRows * pageNum) - maxRows) + parseFloat(1);
    var string = 'Showing ' + start_index + ' to ' + end_index + ' of ' + totalRows + ' entries';
    $('.rows_count').html(string);
}

function default_index() {
    $('table tr:eq(0)').prepend('<th> ID </th>')

    var id = 0;
    console.log('hello');

    $('.table tr:gt(0)').each(function() {
        id++;
        $(this).prepend('<td>' + id + '</td>');
    });
}

function FilterkeyWord_all_table() {

    var count = $('.table').children('tbody').children('tr:first-child').children('td').length;

    var input, filter, table, tr, td, i;
    input = document.getElementById("search_input_all");
    var input_value = document.getElementById("search_input_all").value;
    filter = input.value.toLowerCase();
    if (input_value != '') {
        table = document.getElementById("table-id");
        tr = table.getElementsByTagName("tr");

        for (i = 1; i < tr.length; i++) {

            var flag = 0;

            for (j = 0; j < count; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {

                    var td_text = td.innerHTML;
                    if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                        flag = 1;
                    }
                }
            }
            if (flag == 1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    } else {
        $('#maxRows').trigger('change');
    }
}
