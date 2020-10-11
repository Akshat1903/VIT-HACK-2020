async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/hospitals/medical-colleges';
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
    let state = document.querySelector('.states').value;

    let colleges = users.data.medicalColleges;
    colleges.forEach(x => {
        let html_colleges = `<tr>
                              <td>${x.name}</td>
                              <td>${x.state}</td>
                              <td>${x.city}</td>
                              <td>${x.ownership}</td>
                              <td>${x.admissionCapacity}</td>
                              <td>${x.hospitalBeds}</td>
                          </tr>`;

        html += html_colleges;
    });

    let container = document.querySelector('.cllg_section');
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

function select_state() {
    $('.states').on('change', async function() {
        var selection = document.querySelector('.states').value;
        if (selection == "All") {
          let users = await getUsers();
          let html = '';
          let state = document.querySelector('.states').value;

          let colleges = users.data.medicalColleges;
          colleges.forEach(x => {
              let html_colleges = `<tr>
                                    <td>${x.name}</td>
                                    <td>${x.state}</td>
                                    <td>${x.city}</td>
                                    <td>${x.ownership}</td>
                                    <td>${x.admissionCapacity}</td>
                                    <td>${x.hospitalBeds}</td>
                                </tr>`;

              html += html_colleges;
          });

          let container = document.querySelector('.cllg_section');
          container.innerHTML = html;
        } else {
            let users = await getUsers();
            let html = '';
            let colleges = users.data.medicalColleges;
            colleges.forEach(x => {
                let state = x.state;
                if (selection == state) {
                    let html_colleges = `<tr>
                                <td>${x.name}</td>
                                <td>${x.state}</td>
                                <td>${x.city}</td>
                                <td>${x.ownership}</td>
                                <td>${x.admissionCapacity}</td>
                                <td>${x.hospitalBeds}</td>
                            </tr>`;

                    html += html_colleges;
                };
            });
            let container = document.querySelector('.cllg_section');
            container.innerHTML = html;
        }
        var id = 0;
        $('.table tr:gt(0)').each(function() {
            id++;
            $(this).prepend('<td>' + id + '</td>');
        });
        $('#maxRows').trigger('change');
    });
}

select_state();
///////////////////////////////////////////////////////////

function loadPagination(table) {

    $('.pagination').html(''); // reset pagination div
    var trnum = 0; // reset tr counter
    var maxRows = 10; // get Max Rows from select option

    var totalRows = $(table + ' tbody tr').length; // numbers of rows
    $(table + ' tr:gt(0)').each(function() { // each TR in  table and not the header
        trnum++; // Start Counter
        if (trnum > maxRows) { // if tr number gt maxRows

            $(this).hide(); // fade it out
        }
        if (trnum <= maxRows) {
            $(this).show();
        } // else fade in Important in case if it ..
    }); //  was fade out to fade it in
    if (totalRows > maxRows) { // if tr total rows gt max rows option
        var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
        //	numbers of pages
        for (var i = 1; i <= pagenum;) { // for each page append pagination li
            $('.pagination').append('<li data-page="' + i + '">\
								      <span>' + i++ + '<span class="sr-only">(current)</span></span>\
								    </li>').show();
        } // end for i
    } // end if row count > max rows
    $('.pagination li:first-child').addClass('active'); // add active class to the first li
    //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
    showig_rows_count(maxRows, 1, totalRows);
    //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

    $('.pagination li').on('click', function(e) { // on click each page
        e.preventDefault();
        var pageNum = $(this).attr('data-page'); // get it's number
        var trIndex = 0; // reset tr counter
        $('.pagination li').removeClass('active'); // remove active class from all li
        $(this).addClass('active'); // add active class to the clicked
        //SHOWING ROWS NUMBER OUT OF TOTAL
        showig_rows_count(maxRows, pageNum, totalRows);
        //SHOWING ROWS NUMBER OUT OF TOTAL
        $(table + ' tr:gt(0)').each(function() { // each tr in table not the header
            trIndex++; // tr index counter
            // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            } //else fade in
        }); // end of for each tr in table
    }); // end of on click pagination list
    // end of on select change

    // END OF PAGINATION
}

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
    //Default rows showing
    var end_index = maxRows * pageNum;
    var start_index = ((maxRows * pageNum) - maxRows) + parseFloat(1);
    var string = 'Showing ' + start_index + ' to ' + end_index + ' of ' + totalRows + ' entries';
    $('.rows_count').html(string);
}

// CREATING INDEX
function default_index() {
    $('table tr:eq(0)').prepend('<th> ID </th>')

    var id = 0;
    console.log('hello');

    $('.table tr:gt(0)').each(function() {
        id++;
        $(this).prepend('<td>' + id + '</td>');
    });
}

// All Table search script
function FilterkeyWord_all_table() {

    // Count td if you want to search on all table instead of specific column

    var count = $('.table').children('tbody').children('tr:first-child').children('td').length;

    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("search_input_all");
    var input_value = document.getElementById("search_input_all").value;
    filter = input.value.toLowerCase();
    if (input_value != '') {
        table = document.getElementById("table-id");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {

            var flag = 0;

            for (j = 0; j < count; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {

                    var td_text = td.innerHTML;
                    if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                        //var td_text = td.innerHTML;
                        //td.innerHTML = 'shaban';
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
