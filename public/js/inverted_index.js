const invertedIndex = () => true;
// $('#btn').click(function() {
// $('.side-menu').fadeToggle();
// });

$('.upload').click(() => {
  $('#upload').trigger('click');
});

$('[data-toggle="tooltip"]').tooltip();

$('.process').click(() => {
  $('.modal-x').trigger('click');
});
$('#btn').click(() =>{
	$('#close').trigger('click');
})

