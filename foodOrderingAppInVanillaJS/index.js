const list = document.querySelector(".list");

const getCard = (card) => {
    return `
        <div class="card">
            <h1>
                <label>${card.rating}*</label>
                <span>${card.restaurantName}</span>
            </h1>
            
            <div class="data-container">
                <img class="img" src=${card.img} />
                <div>
                    <label>${card.location}</label>
                    <div class="tags-container">
                        ${card.tags.map(tag => {
                            return ` <label class="tags">${tag}</label>`
                        }).join("")}
                    </div>
                </div>
                <div class="time">ETA: ${card.ETA}</div>
            </div>
        </div>
    `;
}

const generateView = (restaurants) => {
    if(restaurants.length) {
        list.innerHTML = `
            ${restaurants.map(card => {
                return getCard(card);
            }).join("")}
        `;
    } else {
        list.innerHTML = `
            <div>No Data Found!</div>
        `;
    }
}

generateView(restaurants);


// typeahead related code
function debounce(callback, delay = 500) {
    var timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=> {
            callback.apply(this, args);
        }, delay);
    }
}
const keyupHandler = debounce(function(e) {
    const filterData = restaurants.filter(restaurant => {
        return restaurant.restaurantName.includes(e.target.value);
    });
    generateView(filterData);
}, 500);
document.querySelector("#typeahead").addEventListener("keyup", keyupHandler);


// sorting related code
const sortBy = document.querySelector("#sortBy");
sortBy.addEventListener("change", function(e) {
    const propertyName = e.target.value;
    restaurants.sort((a,b) => {
        if (a[propertyName] < b[propertyName]) {
            return -1;
        } else if (a[propertyName] > b[propertyName]) {
            return 1
        } else {
            return 0;
        }
    })
    generateView(restaurants);
});


// filterByTag related code
const filterByTag = document.querySelector("#filterByTag");

let allTagsName = [];
restaurants.map(restaurant => {
    allTagsName = allTagsName.concat(restaurant.tags);
});
allTagsName = [...new Set([...allTagsName])];

filterByTag.innerHTML = `
    ${allTagsName.map(tag => {
        return `<option value=${tag}>${tag}</option>`;
    }).join("")}
`;

filterByTag.addEventListener("change", function(e) {
    const filterData = restaurants.filter(restaurant => {
        return restaurant.tags.includes(e.target.value);
    });
    generateView(filterData);
});
