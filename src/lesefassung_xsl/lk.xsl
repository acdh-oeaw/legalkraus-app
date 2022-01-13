<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes"/>    
    
    <xsl:template match="/">
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
                          
                        <xsl:for-each select="//tei:body/tei:p">
                            <p>
                                <xsl:apply-templates/>
                            </p>
                        </xsl:for-each>
                    </div>
                </div>
        
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
                <span class="person">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
            
            <xsl:when test="@type='institution'">
                <span class="institution">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
            
            <xsl:when test="@type='place'">
                <span class="place">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>

            <xsl:when test="@type='law'">
                <span class="law">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>            

            <xsl:when test="@type='work'">
                <span class="work">                   
                    <xsl:value-of select="."/>                    
                </span>
            </xsl:when>
        
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>
        
    </xsl:template>
    
    <xsl:template match="tei:quote">  
        <span class="quote">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@type='intertext' and starts-with(@source, 'https://fackel')]">  
         <span class="fackel-ref">                   
            <xsl:value-of select="."/>                    
         </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@hand='*']">
        <span class="note-hand">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='underlined']">
        <span class="hi-underlined">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='underlined' and @hand='*']">
        <span class="hi-hand-underlined">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:hi[@rend='spaced']">
        <span class="hi-spaced">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:add">
        <span class="add">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:add[@hand='*']">
        <span class="add-hand">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del">
        <span class="del">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:del[@hand='*']">
        <span class="del-hand">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:subst">
        <span class="subst">                   
            <xsl:apply-templates></xsl:apply-templates>                   
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='marginal' and @hand='*' and @rend='*']">
        <span class="marginalie-text">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:metamark[@function='marginal' and @hand='*' and @rend='*']">
        <span class="metamark">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    
    <xsl:template match="tei:note[@type='paratext' and @resp='lawfirm']">
        <span class="paratext">                   
            <xsl:value-of select="."/>                    
        </span>
    </xsl:template>
    <xsl:template match="tei:pb">
        <div class="pb"/>          
    </xsl:template>
</xsl:stylesheet>

