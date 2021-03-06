const frequentlyPackages = [
  {
    name: 'GSAP',
    value: 'gsap',
  },
  {
    name: 'MI Touch Plugin',
    value: 'mt-plugin',
  },
  {
    name: 'Json To HTML Component',
    value: 'json-to-html',
  },
];

module.exports = [
  {
    type: 'confirm',
    message: `Add frequently used packages like ${frequentlyPackages.map(e => e.name).join(', ')}?`,
    name: 'frequently-packages',
  },
  {
    name: 'frequently-packages-answers',
    when: answers => answers['frequently-packages'], // previous answer name
    type: 'checkbox',
    message: `Pick a packages:`,
    choices: frequentlyPackages,
  },
];
