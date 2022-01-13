<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes"/>    
    
    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
        <html>        
            <style>              
                .switch {
                position: relative;
                display: inline-block;
                width: 30px;
                height: 17px;
                }
                
                /* Hide default HTML checkbox */
                .switch input {
                opacity: 0;
                width: 0;
                height: 0;
                }
                
                /* The slider */
                .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                }
                
                .slider:before {
                position: absolute;
                content: "";
                height: 13px;
                width: 13px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                }
                
                
                input:checked + .slider {
                background-color: #F97979;
                }
                
                input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
                }
                
                input:checked + .slider:before {
                -webkit-transform: translateX(13px);
                -ms-transform: translateX(13px);
                transform: translateX(13px);
                }
                
                /* Rounded sliders */
                .slider.round {
                border-radius: 17px;
                }
                
                .slider.round:before {
                border-radius: 50%;
                }
                
                /* Bootstrap */
                
                /* toggle person */
                #customSwitchPerson:focus~.custom-control-label::before {
                border-color: #F97979 !important;
                box-shadow: 0 0 0 0.2rem rgba(255, 47, 69, 0.25) !important;
                }
                
                #customSwitchPerson:checked~.custom-control-label::before {
                border-color: #F97979 !important;
                background-color: #F97979 !important;
                }
                
                #customSwitchPerson:active~.custom-control-label::before {
                background-color: #F97979 !important;
                border-color: #F97979 !important;
                }
                
                #customSwitchPerson:focus:not(:checked)~.custom-control-label::before {
                border-color: #F97979 !important;
                }
                
                /* toggle institutions */
                #customSwitchInstitution:focus~.label-institutionen::before {
                border-color: #E8EC81 !important;
                box-shadow: 0 0 0 0.2rem rgba(232,236,129,0.25) !important;
                }
                
                #customSwitchInstitution:checked~.label-institutionen::before {
                border-color: #E8EC81 !important;
                background-color: #E8EC81 !important;
                }
                
                #customSwitchInstitution:active~.label-institutionen::before {
                background-color: #E8EC81 !important;
                border-color: #E8EC81 !important;
                }
                
                #customSwitchInstitution:focus:not(:checked)~.label-institutionen::before {
                border-color: #E8EC81 !important;
                }
                
                /* toggle place */
                #customSwitchPlace:focus~.label-place::before {
                border-color: #96FBE4 !important;
                box-shadow: 0 0 0 0.2rem rgba(150, 251, 228, 0.25) !important;
                }
                
                #customSwitchPlace:checked~.label-place::before {
                border-color: #96FBE4 !important;
                background-color: #96FBE4 !important;
                }
                
                #customSwitchPlace:active~.label-place::before {
                background-color: #96FBE4 !important;
                border-color: #96FBE4 !important;
                }
                
                #customSwitchPlace:focus:not(:checked)~.label-place::before {
                border-color: #96FBE4 !important;
                }
                
                /* toggle law */
                #customSwitchLaw:focus~.label-law::before {
                border-color: #D8D8D8  !important;
                box-shadow: 0 0 0 0.2rem rgba(216, 216, 216, 0.25) !important;
                }
                
                #customSwitchLaw:checked~.label-law::before {
                border-color: #D8D8D8  !important;
                background-color: #D8D8D8  !important;
                }
                
                #customSwitchLaw:active~.label-law::before {
                background-color: #D8D8D8  !important;
                border-color: #D8D8D8  !important;
                }
                
                #customSwitchLaw:focus:not(:checked)~.label-law::before {
                border-color: #D8D8D8 !important;
                }
                
                /* toggle quote */
                #customSwitchQuote:focus~.label-quote::before {
                border-color: #6CE97F !important;
                box-shadow: 0 0 0 0.2rem rgba(108, 233, 127, 0.25) !important;
                }
                
                #customSwitchQuote:checked~.label-quote::before {
                border-color: #6CE97F !important;
                background-color: #6CE97F !important;
                }
                
                #customSwitchQuote:active~.label-quote::before {
                background-color: #6CE97F !important;
                border-color: #6CE97F !important;
                }
                
                #customSwitchQuote:focus:not(:checked)~.label-quote::before {
                border-color: #6CE97F !important;
                }
               
               
               /* toggle work */
               #customSwitchWork:focus~.label-work::before {
               border-color: #9CABFF !important;
               box-shadow: 0 0 0 0.2rem rgba(156, 171, 255, 0.25) !important;
               }
               
               #customSwitchWork:checked~.label-work::before {
               border-color: #9CABFF !important;
               background-color: #9CABFF !important;
               }
               
               #customSwitchWork:active~.label-work::before {
               background-color: #9CABFF !important;
               border-color: #9CABFF !important;
               }
               
               #customSwitchWork:focus:not(:checked)~.label-work::before {
               border-color: #9CABFF !important;
               }
               
               
                .main-lf{                  
                    background-color: #F1F1F1 !important;
                    margin: 5rem;
                    padding: 3rem;
                }
                
                .toggles{
                    margin-bottom: 2rem;
                }
                
                .t{
                    table-layout: auto;
                    width: 100%; 
                }
                
            </style>
            <script>                    
                var markPerson = 0;
                var markInstitution = 0;
                var markPlace = 0;
                var markLaw = 0;
                var markQuote = 0;
                var markWork = 0;
                
                function togglePerson(){                 
                    if(markPerson == 0){                        
                        markPerson = 1;
                        document.querySelectorAll('.person').forEach(e => e.style.setProperty('background-color', '#F97979'));
                    }else{                       
                        markPerson = 0;
                        document.querySelectorAll('.person').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                
                function toggleInstitution(){                 
                    if(markInstitution == 0){                        
                        markInstitution = 1;
                        document.querySelectorAll('.institution').forEach(e => e.style.setProperty('background-color', '#E8EC81'));
                    }else{                       
                        markInstitution = 0;
                        document.querySelectorAll('.institution').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                
                function togglePlace(){                 
                    if(markPlace == 0){                        
                        markPlace = 1;
                        document.querySelectorAll('.place').forEach(e => e.style.setProperty('background-color', '#96FBE4'));
                    }else{                       
                        markPlace = 0;
                        document.querySelectorAll('.place').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                
                function toggleLaw(){                 
                    if(markLaw == 0){                        
                        markLaw = 1;
                        document.querySelectorAll('.law').forEach(e => e.style.setProperty('background-color', '#D8D8D8'));
                    }else{                       
                        markLaw = 0;
                        document.querySelectorAll('.law').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                
                function toggleQuote(){                 
                    if(markQuote == 0){                        
                        markQuote = 1;
                        document.querySelectorAll('.quote').forEach(e => e.style.setProperty('background-color', '#6CE97F'));
                    }else{                       
                        markQuote = 0;
                        document.querySelectorAll('.quote').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                
                function toggleWork(){                 
                    if(markWork == 0){                        
                       markWork = 1;
                       document.querySelectorAll('.work').forEach(e => e.style.setProperty('background-color', '#9CABFF'));
                    }else{                       
                       markWork = 0;
                       document.querySelectorAll('.work').forEach(e => e.style.setProperty('background-color', 'transparent'));                        
                    }                   
                }
                            
            </script>
            <head>
                
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"/>
                    
                    
            </head>
            <body>
                
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
                
                
                <div class="main">
                    <h1 id="title">
                        <xsl:apply-templates select="//tei:titleStmt/tei:title"/>
                    </h1>
                    <!--<label class="switch">
                        <script>var p = "<xsl:value-of select="$markPerson"/>";</script>
                        <input type="checkbox" onclick="togglePerson(p)"/>
                        <span class="slider round"></span>
                        Personen
                    </label>-->
                    
                    <div id="allinone" class="card main-lf">
                        <div class="toggles">
                           <table class="t">
                            <tr>
                                <td>
                                    <div class="custom-control custom-switch">                   
                                        <input type="checkbox" class="custom-control-input" id="customSwitchPerson" onclick="togglePerson();"/>
                                        <label class="custom-control-label" for="customSwitchPerson">Personen</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-switch">                        
                                        <input type="checkbox" class="custom-control-input" id="customSwitchInstitution" onclick="toggleInstitution()"/>
                                        <label class="custom-control-label label-institutionen" for="customSwitchInstitution">Institutionen</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-switch">                        
                                        <input type="checkbox" class="custom-control-input" id="customSwitchPlace" onclick="togglePlace()"/>
                                        <label class="custom-control-label label-place" for="customSwitchPlace">Orte</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="custom-control custom-switch">                        
                                        <input type="checkbox" class="custom-control-input" id="customSwitchLaw" onclick="toggleLaw()"/>
                                        <label class="custom-control-label label-law" for="customSwitchLaw">Jur. Texte</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-switch">                        
                                        <input type="checkbox" class="custom-control-input" id="customSwitchQuote" onclick="toggleQuote()"/>
                                        <label class="custom-control-label label-quote" for="customSwitchQuote">Zitate</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-switch">                        
                                        <input type="checkbox" class="custom-control-input" id="customSwitchWork" onclick="toggleWork()"/>
                                        <label class="custom-control-label label-work" for="customSwitchWork">Werke</label>
                                    </div>
                                </td>
                            </tr>
                           </table>
                        </div>
                        <xsl:for-each select="//tei:body/tei:p">
                            <p>
                                <xsl:apply-templates/>
                            </p>
                        </xsl:for-each>
                    </div>
                </div>
            </body>
        </html> 
    </xsl:template>
    
    
    <xsl:template match="tei:title">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <xsl:template match="tei:p">  
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="tei:rs">
        <xsl:choose>
            <xsl:when test="@type='person'">
                <span class="person" style= "padding: 0.15rem;">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
            
            <xsl:when test="@type='institution'">
                <span class="institution" style= "padding: 0.15rem;">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
            
            <xsl:when test="@type='place'">
                <span class="place" style= "padding: 0.15rem;">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>

            <xsl:when test="@type='law'">
                <span class="law" style= "padding: 0.15rem;">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>            

            <xsl:when test="@type='work'">
                <span class="work" style= "padding: 0.15rem;">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
        
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>
        
    </xsl:template>
    
    <xsl:template match="tei:quote">  
        <span class="quote" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@type='intertext' and starts-with(@source, 'https://fackel')]">  
         <span class="fackel-ref" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
         </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@hand='*']">
        <span class="note-hand" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='underlined']">
        <span class="hi-underlined" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='underlined' and @hand='*']">
        <span class="hi-hand-underlined" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='spaced']">
        <span class="hi-spaced" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:add">
        <span class="add" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:add[@hand='*']">
        <span class="add-hand" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del">
        <span class="del" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@hand='*']">
        <span class="del-hand" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:subst">
        <span class="subst" style= "padding: 0.15rem;">                   
            <xsl:apply-templates></xsl:apply-templates>                   
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='marginal' and @hand='*' and @rend='*']">
        <span class="marginalie-text" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:metamark[@function='marginal' and @hand='*' and @rend='*']">
        <span class="metamark" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='paratext' and @resp='lawfirm']">
        <span class="paratext" style= "padding: 0.15rem;">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:pb">
        <div class="pb"/>          
    </xsl:template>
    
</xsl:stylesheet>

