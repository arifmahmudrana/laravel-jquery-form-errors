/* https://amrme.wordpress.com/
 Laravel Form Errors jQuery v0.1.0.
 Written by Arif Mahmud Rana (arif_mahmud_rana{at}hotmail.com) August 2015.
 Available under the MIT (https://raw.githubusercontent.com/arifmahmudrana/laravel-jquery-form-errors/master/LICENSE) license.
 Please attribute the author if you use it. */

/* Display form errors after validating from laravel validation service.

 How to use :
    Your html form
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

     Your js form submit handler
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

  */

(function($) {
    var _registerEvent = function() {
        jQuery(document).on('laravel.form-errors', function(e, data) {
            $.formErrors(e, data.jqXHR, data.textStatus, data.errorThrown);
        });
    };

    $.formErrors = function( e, jqXHR, textStatus, errorThrown ) {
        var _target = e.target;
        if ( jqXHR.status == 422 ) {
            jQuery.each ( jqXHR.responseJSON, function ( i, v ) {
                jQuery ( _target ).find( '[name="' + i + '"]' ).closest ( '.form-group' ).addClass ( 'has-error' ).find ( '.help-block.text-danger' ).hide().html ( v.shift () ).slideDown(500);
            });
        }
    };

    _registerEvent();
}(jQuery));