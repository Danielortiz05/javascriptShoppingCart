// Variables
const courseList = document.querySelector('#lista-cursos');
const listCart = document.querySelector('#lista-carrito tbody');
const emptyCart = document.querySelector('#vaciar-carrito');
let courseArray = [];


// Events Listeners
eventListeners();
function eventListeners (){
    courseList.addEventListener('click', addToCart);

    listCart.addEventListener('click', deleteCourse);

    emptyCart.addEventListener('click', () => {
        courseArray = [];

        cleanHTML();
    });
};


// Functions

function addToCart(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const course = e.target.parentElement.parentElement;
        courseInfo(course);
        
    };
};


function deleteCourse(e) {
    if(e.target.classList.contains('borrar-curso')){
        const courseId = e.target.getAttribute('data-id');
        
        courseArray = courseArray.filter((course) => course.id !== courseId);

        cartHTML();
    }
}


function courseInfo(course){
    const newCourse = {
        name: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        image: course.querySelector('img').src,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1,
    };

    const exist = courseArray.some((course) => course.id === newCourse.id);

    if(exist){
        const courses = courseArray.map( (course) =>{
            if(course.id === newCourse.id){
                course.amount++;
                return course;
            }else{
                return course;
            }
        });
        courseArray = [...courses];
    }else{
        courseArray = [...courseArray, newCourse];
    }
    
    
    cartHTML();
}


function cartHTML(){
    cleanHTML();

    courseArray.forEach( (course) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${course.image}" width="100px">
            </td>
            <td>
                ${course.name}
            </td>
            <td>
                ${course.price}
            </td>
            <td>
                ${course.amount}
            </td>
            <td>
                <a class="borrar-curso" data-id="${course.id}" href="#">X</a>
            </td>
        `
        listCart.appendChild(row);
    });
}


function cleanHTML(){
    while(listCart.firstChild){
        listCart.removeChild(listCart.firstChild);
    };
}



