*{
	font-size: 100%;
	border: none;
	outline: 0;
	padding: 0;
    margin: 0;
    list-style: none;
    font-style: none;
    box-sizing: border-box;
}

html{
    font-size: 10px;
}

body{
    overflow-x: hidden;
    line-height: 1.8em;
}

a:visited, a:active, a:link
{
    color: inherit;
    text-decoration: none;
}

*::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
*{
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* ------------------------ GENERAL STYLES --------------------------  */
@import url("font-url");
@import url("font-url");
@import url("font-url");

:root {
   /*-------------- Fonts----------*/
   --body-font: 400 1.2rem acumin-pro, sans-serif;
   --title-font: 700 1.563rem acumin-pro, sans-serif;
   --secondary-font: 300 italic 1.16rem acumin-pro, sans-serif;
   --accent-font: 700 2.83rem acumin-pro, sans-serif;


   /*------------- Colors ---------------*/
   --primary-color: #2a2438;
   --secondary-color: #433b55;
   --third-color: #4f3b78;
   --fourth-color: #5c5470;
   --accent-color: #5c5470;
   --font-color: #f2f2f2;
   --warning-color: #ec3b3b;
   --success-color: #90d171;

   /*--------- Spacing Specs --------*/
   --xlarge-spacing: 5rem;
   --large-spacing: 3rem;
   --medium-spacing: 1.8rem;
   --small-spacing: 1.5rem;
   --xsmall-spacing: 0.8rem;

    /*-------- Sizing Specs --------*/
   --icon-sizing: 2rem;
   --button-padding: 0.5rem 0;
   --input-padding: 0.5rem;

   /*---------- Main Wrapper --------*/
   --main-wrapper: 92%;
   --max-width-main-wrapper: 50rem;


   /*------------ Breaks ------------*/
   --ipad-break: 600px;
   --laptop-break: 800px;
   --desktop-break: 1050px;
}


@media (min-width: var(--ipad-break)) {
    
    :root{
        /*------------ Spacing Specs -----------*/
        --xlarge-spacing: 5.4rem;
        --large-spacing: 3.3rem;
        --medium-spacing: 2rem;
        --small-spacing: 1.7rem;
        --xsmall-spacing: 0.9rem;

        /*------------- Main Wrapper -------------*/
        --max-width-main-wrapper: 80rem;
    }
    
}

@media (min-width: var(--desktop-break)) {
    
    :root{
          /*----------- Fonts -------------*/
          --body-font: 400 1.35rem acumin-pro, sans-serif;
          --title-font: 700 1.875rem acumin-pro, sans-serif;
          --secondary-font: 300 italic 1.3rem acumin-pro, sans-serif;
          --accent-font: 700 1.35rem acumin-pro, sans-serif;
       
        /*----------- Spacing Specs ----------*/
        --xlarge-spacing: 5.6rem;
        --large-spacing: 3.5rem;
        --medium-spacing: 2.2rem;
        --small-spacing: 1.9rem;
        --xsmall-spacing: 1rem;

        /*------------ Sizing Specs -------------*/
        --icon-sizing: 2.5rem;
        --button-padding: 0.6rem 0;
        --input-padding: 0.6rem;

       /*------------- Main Wrapper -------------*/
        --max-width-main-wrapper: 62.5rem;

    }
}

/*------------------------GENERAL STYLING -----------------------*/
h1, h2, h3, h4, h5, h6, .std-title{
    font: var(--title-font);
    color: var(--font-color);
    text-align: center;
    margin: var(--medium-spacing) auto;
    width: 100%;
}

h2{
    font-size: 1.688rem;
}

h3{
    font-size: 1.563rem;
    margin: var(--small-spacing) auto;
}

h4, .std-title--small{
    font-size: 1.375rem;
    margin: var(--small-spacing) auto;
}

h5, h6{
    font-size: 1.2rem;
    margin: var(--small-spacing) auto;
}

p, .std-text, .std-text--secondary {
    font: var(--body-font);
    color: var(--font-color);
    text-align: center;
    margin: var(--medium-spacing) auto;
    width: 100%;
}

/*-------------------------------- STANDARDS ------------------------------------*/
/*--------------- Buttons:                                                      */
button, .std-button{
    display: block;
    padding: var(--button-padding);
    text-align: center;
    border: none;
}

button:hover, .std-button:hover{
    cursor: pointer;
}

/*--------------- Input:                                                       */
input[type=text], input[type=email], input[type=tel], input[type=url], .std-input{
    display: block;
    padding: var(--input-padding);
    font: var(--primary-font);
    color: var(--font-color);
    outline: none;
    border: none;
}

input[type=radio], input[type=file], input[type=checkbox] {
    display: none;
}

/*--------------- Text:                                                        */
.std-text--secondary{
    font: var(--secondary-font);
}

/*--------------- Images:                                                      */
img, .std-img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    -o-object-fit: cover;
    -o-object-position: center;
    display: block;
    margin: var(--medium-spacing) auto;
}

.std-background
{
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}


.std-icon{
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: var(--icon-sizing);
    height: var(--icon-sizing);
}

/*--------------- Containers:                                                     */
.std-flex-row, .std-flex-column, .std-flex--nowrap,
 .std-flex--start, .std-flex--end {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
 }
 
 .std-flex-column {
    flex-flow: column;
 }

 .std-flex-nowrap{
     flex-wrap: nowrap;
 }

 .std-flex-justify-start{
    justify-content: flex-start;
 }

 .std-flex-justify-end{
    justify-content: flex-end;
 }

 .std-flex-align-start{
    justify-content: flex-start;
 }

 .std-flex-align-end{
    justify-content: flex-end;
 }
