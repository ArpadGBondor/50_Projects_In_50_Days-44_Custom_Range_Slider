const range = document.getElementById('range');

range.addEventListener('input', function (e) {
  const value = +e.target.value;
  const label = range.nextElementSibling;
  const range_width = getComputedStyle(e.target).getPropertyValue('width');
  const label_width = getComputedStyle(label).getPropertyValue('width');

  const num_range_width = +range_width.substring(0, range_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);

  const max = +e.target.max;
  const min = +e.target.min;

  // const left = ((value - min) / (max - min)) * num_range_width - num_label_width / 2;
  let left = scale(value, min, max, 0 - num_label_width / 2, num_range_width - num_label_width / 2);

  // compensate on the ends: 4%
  left += scale(value, min, max, 0.04 * num_range_width, -0.04 * num_range_width);

  label.style.left = `${left}px`;

  label.innerHTML = value;
});

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
