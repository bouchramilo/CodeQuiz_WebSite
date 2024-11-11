// document.getElementById('quiz_form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const numQCM = parseInt(document.getElementById('nbrQestionsQCM').value);
//     const numVF = parseInt(document.getElementById('nbrQestionsVF').value);
//     const numTextuel = parseInt(document.getElementById('nbrQestionsTxt').value);

//     const questionFormContainer = document.getElementById('questionFormContainer');
//     questionFormContainer.innerHTML = ''; // Clear previous forms

//     let questionCount = 1;

//     // Generate QCM questions
//     for (let i = 0; i < numQCM; i++) {
//         const qcmForm = document.createElement('section');
//         qcmForm.classList.toggle("max-md:text-sm");
//         qcmForm.innerHTML = `
        
        
//         <div class="w-full flex flex-col justify-center items-center gap-6 py-3 ">
//         <div class=" ">
//         <h3>QCM Question ${questionCount++}</h3>
//         <h1 class="text-2xl ">
//                     QCM quiz:
//                 </h1>
//             </div>

//             <div class="w-full flex justify-center px-3 ">

//                 <form action="" id="questionForm" 
//                     class=" bg-gray-200 lg:w-[90%] max-lg:w-[95%] max-md:w-full flex flex-col gap-2 p-2 border-2 rounded-md ">

//                     <div class="flex lg:flex-row gap-2 max-md:flex-col">
//                         <div class="flex flex-col gap-2 p-2 w-1/2 max-md:w-full  justify-center  ">
//                             <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col  gap-1 w-full">
//                                 <input type="hidden" id="id_quiz${i}" value="1">
//                                 <input type="hidden" id="typeQuestion${i}" value="QCM">
//                                 <label for="question" class="lg:w-1/2 max-md:w-full">Question : </label>
//                                 <input type="text" placeholder="Question" id="question${i}"
//                                     class=" h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                     required>
//                             </div>
//                             <div class="flex flex-col gap-2 w-full ">
//                                 <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
//                                     <label for="option 1" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 1 :
//                                     </label>
//                                     <input type="text" placeholder="Option 1" id="option_1${i}"
//                                         class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                         required>
//                                 </div>
//                                 <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
//                                     <label for="option 2" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 2 :
//                                     </label>
//                                     <input type="text" placeholder="Option 2" id="option_2${i}"
//                                         class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                         required>
//                                 </div>
//                                 <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
//                                     <label for="option 3" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 3 :
//                                     </label>
//                                     <input type="text" placeholder="Option 3" id="option_3${i}"
//                                         class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                         required>
//                                 </div>
//                                 <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
//                                     <label for="option 4" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 4 :
//                                     </label>
//                                     <input type="text" placeholder="Option 4" id="option_4${i}"
//                                         class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                         required>
//                                 </div>

//                             </div>
//                         </div>

//                         <div
//                             class="w-1/2 max-md:w-full flex flex-col gap-2 border-l-2 max-md:border-none border-yellow-600 max-md:border-non pl-2 ">
//                             <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col">
//                                 <h3 class="lg:w-1/2 max-md:w-full max-lg:w-full">Les bonnes réponses : </h3>
//                                 <div class="flex flex-col lg:w-1/2 max-md:w-full max-lg:w-full items-center ">
//                                     <span><input type="radio" class="" id="rep_option_1${i}">Option 1</span>
//                                     <span><input type="radio" class="" id="rep_option_2${i}">Option 2</span>
//                                     <span><input type="radio" class="" id="rep_option_3${i}">Option 3</span>
//                                     <span><input type="radio" class="" id="rep_option_4${i}">Option 4</span>
//                                 </div>
//                             </div>
//                             <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
//                                 <label for="explication"
//                                     class="lg:w-1/2 max-md:w-full max-lg:w-full">Explication</label>
//                                 <textarea type="text" placeholder="Explication " id="explication${i}"
//                                     class="h-28 lg:w-1/2 max-md:w-full max-lg:w-full resize-none border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                     required></textarea>
//                             </div>
//                             <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
//                                 <label for="explication" class="lg:w-1/2 max-md:w-full max-lg:w-full">Points : </label>
//                                 <input type="number" placeholder="Points" id="points${i}"
//                                     class="h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                     required>
//                             </div>
//                             <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
//                                 <label for="explication" class="lg:w-1/2 max-md:w-full max-lg:w-full">Temps du question
//                                     : </label>
//                                 <input type="time" placeholder="time" id="timeQuestion${i}"
//                                     class="h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
//                                     required>
//                             </div>
//                         </div>


//                     </div>


//                     <div class="w-full h-10 flex flex-row justify-center pt-2 ">
//                         <button type="submit" id="question_suivant${i}"
//                             class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">
//                             suivant
//                         </button>
//                     </div>

//                 </form>

//             </div>

//         </div>

//     </section>
//         `;
//         questionFormContainer.appendChild(qcmForm);
//     }

//     // Generate Vrai/Faux questions
//     // for (let i = 0; i < numVF; i++) {
//     //     const vfForm = document.createElement('div');
//     //     vfForm.innerHTML = `
//     //         <h3>Vrai/Faux Question ${questionCount++}</h3>
//     //         <label for="vfQuestion${i}">Question :</label>
//     //         <input type="text" id="vfQuestion${i}" name="vfQuestion${i}" required>

//     //         <label>Réponse :</label>
//     //         <input type="radio" name="correctVF${i}" value="Vrai">Vrai
//     //         <input type="radio" name="correctVF${i}" value="Faux">Faux
//     //     `;
//     //     questionFormContainer.appendChild(vfForm);
//     // }

//     // Generate Textual questions
//     // for (let i = 0; i < numTextuel; i++) {
//     //     const textForm = document.createElement('div');
//     //     textForm.innerHTML = `
//     //         <h3>Textuel Question ${questionCount++}</h3>
//     //         <label for="textQuestion${i}">Question :</label>
//     //         <input type="text" id="textQuestion${i}" name="textQuestion${i}" required>

//     //         <label for="textAnswer${i}">Réponse :</label>
//     //         <textarea id="textAnswer${i}" name="textAnswer${i}" required></textarea>
//     //     `;
//     //     questionFormContainer.appendChild(textForm);
//     // }
// });
