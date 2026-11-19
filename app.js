const courses = [
  [1,"10210CS101","Problem Solving using C",3],[1,"10210CS301","Problem Solving using C Laboratory",1],[1,"10210EE301","Engineering Products Laboratory",1],[1,"10210EN201","Professional Communication - I",2],[1,"10210MA101","Linear Algebra for Computing",4],[1,"10210ME101","Design Thinking",2],[1,"10210ME102","Universal Human Values",3],[1,"10210ME201","Engineering Graphics",3],[1,"10210PH101","Semiconductor Physics",3],[1,"10210PH301","Modern Physics Laboratory",1],[1,"10217GE901","Engineers and Society","M"],
  [2,"10210BM101","Biology for Engineers",2],[2,"10210CS104","Programming using Python",3],[2,"10210CS305","Programming using Python Laboratory",1],[2,"10210EC201","Basic Electronics and Digital Logic Design",3],[2,"10210EE204","Introduction to Engineering",3],[2,"10210EN202","Professional Communication - II",2],[2,"10210MA102","Calculus and Ordinary Differential Equations",4],[2,"10210MA103","Probability, Statistics and Queuing Theory",4],[2,"10210ME103","Innovation and Entrepreneurship",2],[2,"10217GE902","Constitution of India","M"],
  [3,"10210MA110","Discrete Mathematical Structures",4],[3,"10210ME104","Project Management and Finance",2],[3,"10211AM101","Data Structures",3],[3,"10211AM118","Image Processing Techniques",3],[3,"10211AM129","Modern Computer Architecture",3],[3,"10211AM211","Artificial Intelligence Techniques",4],[3,"10211AM301","Data Structures Laboratory",1],[3,"10211AM306","Competitive Coding - I",1],[3,"10213EC108","Building Automation",3],[3,"10216GE901","Soft Skills - I",1],
  [4,"10210CH104","Environmental Science and Sustainability",3],[4,"10211AM103","Operating Systems",3],[4,"10211AM202","Design and Analysis of Algorithms",4],[4,"10211AM207","Database Management Systems",4],[4,"10211AM226","Java Programming",3],[4,"10211AM304","Operating Systems Laboratory",1],[4,"10211AM307","Competitive Coding - II",1],[4,"10213GE309","Communicative English",2],[4,"10214AM501","Community Service Project",1],[4,"10215AM959","Introduction to Deep Learning with Keras & Tensor Flow",1],[4,"10216GE902","Soft Skills - II",1],
  [5,"10211AM110","Optimization Techniques",3],[5,"10211AM210","Big Data Analytics",4],[5,"10211AM223","Machine Learning Techniques",4],[5,"10212AM236","Problem Solving and Testing using Java",3],[5,"10212AM295","Applied Coding Skills",3],[5,"10213BT420","Basics of Food and Nutrition - NPTEL Open Elective",3],[5,"10213GE308","Professional Communication for Engineers",2],[5,"10214AM601","Minor Project - I",2],[5,"10215AM961","Prompt Engineering and Context Engineering",1],[5,"10216GE903","Aptitude Skills - I",1],
  [6,"10211AM214","Data Visualization",4],[6,"10211AM215","Deep Learning",4],[6,"10211AM216","Natural Language Processing",4],[6,"10212AM245","Algorithmic Techniques",4],[6,"","NPTEL Program Elective",4],[6,"10215AM602","Minor Project II",2],[6,"10216GE904","Aptitude Skills II",1],[6,"","Open Elective",2],
  [7,"10211AM224","Full Stack Application Development",3],[7,"10211AM309","Robotic Process Automation Laboratory",1],[7,"","Program Elective",4],
  [8,"","Major Project",9]
].map(([semester,code,name,credits])=>({semester,code,name,credits}));

const tabs = document.querySelector("#semester-tabs");
const rows = document.querySelector("#course-rows");
const query = document.querySelector("#search");
let selected = 1;

const semesterCourses = semester => courses.filter(course => course.semester === semester);
const totalCredits = list => list.reduce((total, course) => total + (typeof course.credits === "number" ? course.credits : 0), 0);

function renderTabs(){
  tabs.replaceChildren();
  for(let semester=1;semester<=8;semester++){
    const list=semesterCourses(semester);
    const button=document.createElement("button");
    button.type="button"; button.className="semester-tab"; button.role="tab";
    button.setAttribute("aria-selected",String(semester===selected));
    button.setAttribute("aria-controls","course-rows");
    button.innerHTML=`Semester ${semester}<small>${totalCredits(list)} numeric credits${list.some(c=>c.credits==="M")?" + M":""}</small>`;
    button.addEventListener("click",()=>{selected=semester;renderTabs();renderCourses();});
    tabs.append(button);
  }
}

function renderCourses(){
  const list=semesterCourses(selected);
  const term=String(query.value||"").trim().toLowerCase();
  const filtered=list.filter(course=>`${course.code} ${course.name}`.toLowerCase().includes(term));
  document.querySelector("#semester-title").textContent=`Semester ${selected}`;
  const total=totalCredits(list);
  const hasM=list.some(course=>course.credits==="M");
  document.querySelector("#semester-total").textContent=`${list.length} courses · ${total} numeric credits${hasM?" + M":""}`;
  document.querySelector("#table-total").textContent=`${total}${hasM?" + M":""}`;
  rows.replaceChildren();
  for(const course of filtered){
    const tr=document.createElement("tr");
    const code=document.createElement("td");code.className="code";code.textContent=course.code||"—";
    const name=document.createElement("td");name.className="course";name.textContent=course.name;
    const credit=document.createElement("td");credit.className="credits";credit.textContent=String(course.credits);
    tr.append(code,name,credit);rows.append(tr);
  }
  document.querySelector(".table-shell").hidden=filtered.length===0;
  document.querySelector("#empty").hidden=filtered.length!==0;
  document.querySelector("#status").textContent=`Semester ${selected}: ${filtered.length} courses shown`;
}

query.addEventListener("input",renderCourses);
document.querySelector("#course-count").textContent=String(courses.length);
renderTabs();renderCourses();

let installEvent;
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installEvent=event;const button=document.querySelector("#install");button.hidden=false;button.addEventListener("click",async()=>{if(!installEvent)return;installEvent.prompt();await installEvent.userChoice;installEvent=null;button.hidden=true;},{once:true});});
if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost")) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
