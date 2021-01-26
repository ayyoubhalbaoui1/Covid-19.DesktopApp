$(function() {

    var $orders = $('#orders');
    var $id = $('#id');
    var $fName = $('#fname');
    var $lName = $('#lName');
    var $phone = $('#phone');
    var $email = $('#email');
    var $cin = $('#cin');
    var $password = $('#password');

    var orderTemplate = "" +
        "<li>" +
        "<p><strong>First Name:</strong>{{fName}}</p>" +
        "<p><strong>Last Name:</strong>{{lName}}</p>" +
        "<p><strong>Phone/:</strong>{{phone}}</p>" +
        "<p><strong>Email/:</strong>{{email}}</p>" +
        "<p><strong>Cin/:</strong>{{cin}}</p>" +
        "<p><strong>Password/:</strong>{{password}}</p>" +
        "<button data-id='{{id}}'class='remove'></button>" > +
        "</li>";

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    };


    // -----------------------------Get Data-----------------------

    $.ajax({
        type: 'GET',
        url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users',
        success: function(orders) {
            $.each(orders, function(i, order) {
                $orders.append('<li> id :' + order.id + '  first name :' + order.fName + '  last name :' + order.lName + '  Phone :' + order.phone + '   email :' + order.email + '  cin :' + order.cin + 'password:' + order.password + ' <button onclick="deleteItem(' + order.id + ')"  > Delete </button> ' + '  </li>')
            });
        },
        error: function() {
            alert('error');
        }
    })

    $('#add-order').on('click', function() {

        var order = {
            id: $id.val(),
            fName: $fName.val(),
            lName: $lName.val(),
            phone: $phone.val(),
            email: $email.val(),
            cin: $cin.val(),
            password: $password.val(),
        };

        // ----------------Post data------------------

        $.ajax({
            type: 'POST',
            url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users',
            data: order,
            success: function(newOrder) {
                $orders.append('<li> First Name :' + order.fName + '  Last Name: ' + order.lName + '  Phone: ' + order.phone + '   email :' + order.email + 'Cin: ' + order.cin + '  <button data-id=' + order.id + ' password' + order.password + ' class=remove > x </button> ' + ' </li>')
            }
        });
    });


});


// ------------------Delete Data--------------

function deleteItem(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users/' + id,
        success: function() {

            alert('Deleted');
            location.reload();
        },
        error: function(error) {
            alert(error);
        }
    });
}