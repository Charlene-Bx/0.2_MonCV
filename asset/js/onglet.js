
if(screen.width <= 768 || document.body.clientWidth <= 768){

    const onglets= document.querySelectorAll('.onglet');
    const nb_onglets= onglets.length-1;

    //Si l'écran est en mobile, l'affichage change et les onglets sont tous dépliés, il faut changer les datas folded
    let change_data= true;
    if(change_data){
        onglets.forEach(onglet=>onglet.dataset.folded='false');
        change_data=false;
    };

    
    //pour chacuns des onglets
    onglets.forEach((onglet,index,array)=>{

        //on ajoute un ecouteur d'evenement 'click
        onglet.addEventListener('click',()=>{

            //A chaque click sur un onglet, on verifie l'etat de sa data 'folded'
            let folded= onglet.dataset.folded;

            //A chaque click sur un onglet, on selection sa section, et on determine la largeur de la fenetre
            let section_width= onglet.previousElementSibling.children[0].clientWidth;

            //en fonction de si l'onglet est 'folded:false' ou 'falded:true'
            switch(folded){

                case 'false':

                    //Si l'onglet n'est pas le dernier, alors de l'onglet jusqu'au premier, on les replie
                    if(index != nb_onglets){
                        for(let x=index-1 ; x>=0 ; x--){
                            //si x=0, le premier onglet, c'est son parent qu'il faut deplacer, pas l'enfant
                            if(x===0){
                                array[x].previousElementSibling.style.right=`${section_width}px`;
                            }else{
                                array[x].previousElementSibling.children[0].style.right=`${section_width}px`;
                            }
                            array[x].style.gridColumn= '1/span 1';
                            array[x].dataset.folded= 'true';
                        };
                    };
                    break;

                case 'true':
                    //si l'onglet est replié, alors, de l'onglet jusqu'au dernier, on les deplie
                    for(let x=index ; x<= nb_onglets; x++){
                        if(index === 0){
                            onglet.previousElementSibling.style.right='';
                        }else{
                            array[x].previousElementSibling.children[0].style.right='';
                        };

                        array[x].style.gridColumn= '3/span 1';
                        array[x].dataset.folded= 'false';   
                    };
                    break;
            }

        })
    })

}else{
    const onglets= document.querySelectorAll('.onglet');
    const nb_onglets= onglets.length-1;

    let change_data= true;
    if(change_data){
        onglets.forEach((onglet,index)=>{index!==0?onglet.dataset.folded='false':null});
        change_data=false;
    }; 


// FONCTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const AnimOnglet = (element, index, section) => {

            switch(index){
                case 0: 
                    let bulle= section.children[0].children[1];
                    bulle.style.animation='agitBulle 0.1s ease-out alternate 4';
                    break;
                case 1:
                case 2:
                case 3:
                    element.style.paddingLeft='7%';
                    element.style.width='107%';
                    element.style.color='#e7a988';
                    break;
                case 4:
            }

    };

    const ReturnOnglet = (element, index, section) => {

        switch(index){
            case 0: 
                let bulle= section.children[0].children[1];
                bulle.style.animation='';
                break;
            case 1:
            case 2:
            case 3:
                element.style.paddingLeft='0%';
                element.style.width='100%';
                element.style.color='#da7b48';
                break;
            case 4:
        }

    };


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POUR CHAQUE ONGLETS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onglets.forEach((onglet,index,array)=>{
        let section= onglet.previousElementSibling.children[0]; 
        let section_width= section.clientWidth;
        let folded= onglet.dataset.folded;

        onglet.addEventListener('mouseover',()=>{AnimOnglet(onglet, index, section);});
        onglet.addEventListener('mouseout',()=>{ReturnOnglet(onglet, index, section);});
        onglet.addEventListener('click',()=>{
            if(index!=0){
                let folded= onglet.dataset.folded;
                switch(folded){
                    
                    //QUAND L'ONGLET EST REPLIE (folded='true')
                    case 'true':
                        if(index != nb_onglets){
                            folded= 'false';
                            //de l'index de l'onglet jusqu'au dernier
                            for(x=index ; x<=nb_onglets ; x++){
                                //deplier les onglet et leurs section
                                array[x].style.gridColumn= '3/3';
                                array[x].previousElementSibling.children[0].style.right= '0px';
                                array[x].dataset.folded='false';
                                console.log("Cet onglet n'est pas le dernier et folded est maintenant:", folded)
                            };
                        };
                        //Pour déplier le dernier onglet
                        //else{
                        //     onglet.style.gridColumn= '3/3';
                        //     section.style.right= '0px';
                        //     folded= 'false';
                        //     console.log('folded si true et le dernier:', folded)
                        // }
                        break;

                    //QUAND L'ONGLET EST DEPLIE (folded= 'false')
                    case 'false':
                        let onglet_precedent= array[index-1];
                        
                        if(index != 1 && index != nb_onglets){
                            if(onglet_precedent.folded=='true'){
                                onglet.style.gridColumn= '1/1';

                                section.style.right= `${section_width}px`;
        
                                folded= 'true'
        
                                console.log("Cet onglet n'est pas le premier folded est '"+folded+"' ")
                                //de l'index de l'onglet jusqu'au premier
                                for(x=index-1;x>=1;x--){
                                //replier les onglet et leurs section
                                array[x].style.gridColumn= '1/1';
                                array[x].previousElementSibling.children[0].style.right= `${array[x].previousElementSibling.children[0].clientWidth}px`;
                                array[x].dataset.folded= 'true';}
                            }else{
                                for(x=index-1;x>=1;x--){
                                    //replier les onglet et leurs section
                                    array[x].style.gridColumn= '1/1';
                                    array[x].previousElementSibling.children[0].style.right= `${array[x].previousElementSibling.children[0].clientWidth}px`;
                                    array[x].dataset.folded= 'true';
                            }
                        }
                    }
                    else if(index === nb_onglets){
                    //     for(x=1;x<=nb_onglets;x++){
                    //         //replier les onglet et leurs section
                    //         array[x].style.gridColumn= '1/1';
                    //         array[x].previousElementSibling.children[0].style.right= `${array[x].previousElementSibling.children[0].clientWidth}px`;
                    //         array[x].dataset.folded= 'true';
                    // }
                    }else{
                        onglet.style.gridColumn= '1/1';
                        section.style.right= `${section_width}px`;
                        folded= 'true'
                        console.log('cet onglet est le premier et folded est maintenant:', folded)
                    }
                    break;
                }
            };
            
        })

    });

    
};
    