const invertedIndex = () => true;

let filesArray;

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

document.getElementById('upload')
  .addEventListener('change', () => {
    filesArray = document.getElementById('upload').files;
  });
