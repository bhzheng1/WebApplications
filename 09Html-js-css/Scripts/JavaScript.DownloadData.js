$(document).ready(function() {
    $('#example').DataTable( {
        "ajax":'Data/arrays.txt',
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: '<i class="far fa-file-excel"></i> Excel Export',
                exportOptions: {
                    modifier: {
                        search: 'applied',
                        order: 'applied'
                    }
                }
            }
        ]
    } );
} );
