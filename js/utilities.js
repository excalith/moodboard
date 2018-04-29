// RANDOM INPUT PLACEHOLDER
var a = Math.random() + ""
var randPlaceholder = a.charAt(4)
quotes = new Array
quotes[1] = "Greetings earthling, we are friends!"
quotes[2] = "Ph'nglui mglw'nafh cthulhu r'lyeh wgah'nagl fhtagn!"
quotes[3] = "These are not the results you are looking for"
quotes[4] = "Wakka wakka wakka!"
var quote = quotes[randPlaceholder]
$(".quicksearch").attr("placeholder", quote);

// FULLSREEN BUTTON
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

// Isotope
$(function () {
  var qsRegex;
  var $grid = $('#grid').isotope({
    layoutMode: 'masonry',
    filter: function () {
      return qsRegex ? $(this).text().match(qsRegex) : true;
    }
  });

  $grid.on('click', '.grid-item', function () {
    $(this).toggleClass('gigante');
    $grid.isotope('layout');
  });

  var $quicksearch = $('.quicksearch').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
  }, 200));
});

function debounce(fn, threshold) {
  var timeout;
  return function debounced() {
    if (timeout) {
      clearTimeout(timeout);
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout(delayed, threshold || 100);
  }
}

// FILE INPUT
document.getElementById('fileSelector').addEventListener('change', handleFileSelection, false);
function handleFileSelection(evt) {
  var files = evt.target.files;

  for (var i = 0, file; file = files[i]; i++) {
    AddToGrid(file);
  }
}

// DROPZONE
var dropZone = document.getElementById('dropzone');
function allowDrag(e) {
  if (true) {  // Test that the item being dragged is a valid one
    e.dataTransfer.dropEffect = 'copy';
    e.preventDefault();
  }
}

// Dropzone Events
window.addEventListener('dragenter', function (e) {
  showDropZone();
});
dropZone.addEventListener('dragleave', function (e) {
  hideDropZone();
});
dropZone.addEventListener('dragenter', allowDrag);
dropZone.addEventListener('dragover', allowDrag);
dropZone.addEventListener('drop', handleDrop);

function showDropZone() {
  $("#dropzone").fadeIn("slow");
}
function hideDropZone() {
  $("#dropzone").fadeOut("slow");
}

function handleDrop(e) {
  e.preventDefault();
  hideDropZone();
}

Dropzone.options.dropzone = {
  init: function () {
    this.on("addedfile", function (file) {
      AddToGrid(file);
    });
  }
};

// ADD TO GRID FUNCTION
function AddToGrid(file)
{
  var img_element = document.createElement('img');
  img_element.src = window.URL.createObjectURL(file);
  img_element.onload = function () {
    window.URL.revokeObjectURL(this.src);
  }

  // NESTED BUTTONS
  // Close Button Needs To Be Implemented
  //var span_nested = document.createElement('span');
  //span_nested.className = "nested";

  // GRID ITEM
  var item_element = document.createElement('div');
  item_element.className = "grid-item";

  //item_element.appendChild(span_nested);
  item_element.appendChild(img_element);

  $('#grid').isotope('insert', item_element);
  $('#grid').isotope('layout');
}

