const colorInterpolation = (layer) => [
    'interpolate',
    ['linear'],
    ['get', layer],
    0, '#ff0000',  // Red (low value)
    0.1, '#ff3300',
    0.2, '#ff6600',
    0.3, '#ff9900',
    0.4, '#ffcc00',
    0.5, '#ffff00',  // Yellow
    0.6, '#ccff00',
    0.7, '#99ff00',
    0.8, '#66ff00',
    0.9, '#33ff00',
    1, '#00ff00',  // Green
    2, '#00ff66',
    3, '#00ffcc',
    4, '#00ffff',
    5, '#00ccff',
    6, '#0099ff',
    7, '#0066ff',
    8, '#0033ff',
    9, '#0000ff',  // Blue
    10, '#000080'  // Dark Blue
];

export default colorInterpolation;
