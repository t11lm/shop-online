let pedant = 0;
let nightlights = 0;
let overhead = 0;
let point = 0;
let ceiling = 0;

export function typeFilter(arr) { 
    arr.forEach(goods => {
        if (goods.type.includes("pendant")) {
            pedant++;
        }
        if (goods.type.includes("nightlights")) {
            nightlights++;
        }
        if (goods.type.includes("overhead")) {
            overhead++;
        }
        if (goods.type.includes("point")) {
            point++;
        }
        if (goods.type.includes("ceiling")) {
            ceiling++;
        }
    });

    const pendantEl = document.querySelector('label[for="pendant"]');
    const pendantCount = pendantEl.querySelector('.custom-checkbox__count');
    pendantCount.textContent = pedant;

    const ceilingEl = document.querySelector('label[for="ceiling"]');
    const ceilingCount = ceilingEl.querySelector('.custom-checkbox__count');
    ceilingCount.textContent = ceiling;

    const overheadEl = document.querySelector('label[for="overhead"]');
    const overheadCount = overheadEl.querySelector('.custom-checkbox__count');
    overheadCount.textContent = overhead;

    const pointEl = document.querySelector('label[for="point"]');
    const pointCount = pointEl.querySelector('.custom-checkbox__count');
    pointCount.textContent = point;

    const nightlightsEl = document.querySelector('label[for="nightlights"]');
    const nightlightsCount = nightlightsEl.querySelector('.custom-checkbox__count');
    nightlightsCount.textContent = nightlights;
}

