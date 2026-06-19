(function(){
  window.closeModals=function(){
    var modal=document.querySelector('.modal,.modalinit');
    if(modal){ modal.classList.add('hidden'); modal.classList.remove('modal'); modal.classList.add('modalinit'); }
  };

  var links=document.querySelectorAll('a[href^="#"]');
  for(var i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
      var href=this.getAttribute('href');
      var target=document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      window.scrollTo({top:target.getBoundingClientRect().top+window.pageYOffset,behavior:'smooth'});
    });
  }

  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    var prev=document.getElementById('prev');
    if(prev){
      prev.style.marginTop=Math.max(-90, -y*0.06)+'px';
      prev.style.opacity=Math.max(0,Math.min(1,1-y/900));
    }
    var banners=document.querySelectorAll('.banner');
    for(var i=0;i<banners.length;i++){
      var r=banners[i].getBoundingClientRect();
      var bg=Math.round((r.top-window.innerHeight)*-0.22-500);
      banners[i].style.backgroundPosition='50% '+bg+'px';
      var skin=banners[i].querySelector('.skin');
      if(skin) skin.style.backgroundPosition='0px '+Math.max(0,Math.round((window.innerHeight-r.top)*.18))+'px';
    }
    var enters=document.querySelectorAll('.enterscroll');
    for(var j=0;j<enters.length;j++){
      if(enters[j].getBoundingClientRect().top<window.innerHeight-80){ enters[j].classList.add('visible'); }
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  onScroll();

  var holder=document.getElementById('particles-js');
  if(!holder) return;
  var canvas=document.createElement('canvas');
  canvas.id='particles-canvas';
  holder.appendChild(canvas);
  var ctx=canvas.getContext('2d');
  var particles=[],count=69;
  function resize(){canvas.width=holder.clientWidth||window.innerWidth;canvas.height=holder.clientHeight||Math.max(450,window.innerHeight*.85)}
  function reset(p){p.x=Math.random()*canvas.width;p.y=Math.random()*canvas.height;p.r=1+Math.random()*10;p.a=.025+Math.random()*.09;p.vx=(Math.random()-.5)*.55;p.vy=(Math.random()-.5)*.55}
  function init(){resize();particles=[];for(var i=0;i<count;i++){var p={};reset(p);particles.push(p)}}
  function tick(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff';for(var i=0;i<particles.length;i++){var p=particles[i];p.x+=p.vx;p.y+=p.vy;if(p.x<-30||p.x>canvas.width+30||p.y<-30||p.y>canvas.height+30)reset(p);ctx.globalAlpha=p.a;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;requestAnimationFrame(tick)}
  window.addEventListener('resize',resize);init();tick();
})();
