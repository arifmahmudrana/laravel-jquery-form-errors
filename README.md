# laravel-jquery-form-errors
#### Simply show laravel validation form errors for client side

This is a simple plugin that shows laravel validation errors for forms in a simple way. It assumes in your form you are using **.form-group** class to group your form controls and you have a **.help-block.text-danger** element right after your form control which you are validating. After you submit your form and get an error you just need to trigger the custom **laravel.form-errors** event on your form or in document or body. It will search form element from **event target** and add bootstrap **.has-error** class on closest **.form-group** element and will show the first error in the **.help-block.text-danger** section.
 
### Dependencies
- Laravel 5
- jQuery
- Bootstrap 3

### Usage
**Your html form**

     {!! Form::open(['route' => 'YOUR_ROUTE', 'role' => 'form']) !!}

         <div class="form-group">
            {!! Form::label('name', 'Name ', ['class' => 'col-md-3 control-label']) !!}
             <div class="col-md-9">
             {!! Form::select('food[]', $food, null, ['class' => 'form-control select2me', 'multiple' => ''] ) !!}
             <span class="help-block text-danger"></span>
             </div>
        </div>

         <div class="form-group">
            {!! Form::button('<i class="fa fa-save"></i>&nbsp;Save', ['class' => 'btn btn-md btn-primary', 'type' => 'submit']) !!}
         </div>

     {!! Form::close() !!}
     
     
**Your js form submit handler**
     
     
         jQuery ( 'YOUR_SELECTOR_TO_SELECT_FORM' ).on ( 'submit', function(e) {
            var _self = jQuery(this);
            jQuery.ajax ( {
                url : _self.attr ( 'action' ),
                type : _self.attr ( 'method' ),
                data : _self.serialize ()
            }).done ( function ( data, textStatus, jqXHR ) {

            }).fail ( function ( jqXHR, textStatus, errorThrown ) {
                //if any error occurs trigger custom event 'laravel.form-errors' & listening handler will do the rest
                jQuery(_self).trigger('laravel.form-errors', { jqXHR : jqXHR, textStatus : textStatus, errorThrown : errorThrown });
            });
         } );

### Contribute
You can fork and contribute to development of the package. All pull requests is welcome.

### License

The Laravel framework is open-sourced software licensed under the [MIT license](https://raw.githubusercontent.com/arifmahmudrana/laravel-jquery-form-errors/master/LICENSE)
