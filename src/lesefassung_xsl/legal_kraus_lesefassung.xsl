<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:v-on="http://example.com/v-on" xmlns:v-bind="http://example.com/v-bind" xmlns:local="http://example.com"
    exclude-result-prefixes="xs tei v-on local" version="2.0">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes"/>
    <!-- fragmenting function based on https://wiki.tei-c.org/index.php/Milestone-chunk.xquery -->
    <xsl:variable name="teiHeader" select="//tei:teiHeader"/>
    <xsl:function name="local:split">
        <xsl:param name="ms1" as="element()"/>
        <xsl:param name="ms2" as="element()"/>
        <xsl:param name="node" as="node()*"/>
        <xsl:choose>
            <xsl:when test="$node instance of element()">
                <xsl:choose>
                    <xsl:when test="$node is $ms1">
                        <xsl:copy-of select="$node"/>
                    </xsl:when>
                     <xsl:when test="$node/name() = 'back'"></xsl:when>
                    <xsl:when test="
                            some $n in $node/descendant::*
                                satisfies ($n is $ms1 or $n is $ms2)">
                        <xsl:element namespace="http://www.tei-c.org/ns/1.0" name="{$node/local-name()}">
                            <xsl:copy-of select="
                                    for $i in ($node/node() | $node/@*)
                                    return
                                        local:split($ms1, $ms2, $i)"/>
                        </xsl:element>
                    </xsl:when>
                    <xsl:when test="$node >> $ms1 and $node &lt;&lt; $ms2">
                        <xsl:copy-of select="$node"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:when>
            <xsl:when test="$node instance of attribute()">
                <xsl:copy-of select="$node"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="$node >> $ms1 and $node &lt;&lt; $ms2">
                    <xsl:copy-of select="$node"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>
    <xsl:template match="tei:TEI[not(//tei:pb)]">
        <div  ref="readview" class="no-desc">
        <xsl:value-of select="//tei:body//tei:div[@type='no-transcription']"/>
    </div>
    </xsl:template>
   <xsl:template match="tei:TEI[//tei:pb]">
        <xsl:variable name="result">
            <xsl:for-each select="//tei:pb">
                <xsl:variable name="nextPb" select="current()/following::tei:pb[1]"/>
                <div>
                    <xsl:if test="count(current()/following::*[@rend=('leftMargin','marginLeft')][. &lt;&lt; $nextPb]) > 0">
                        <xsl:attribute name="class" select="'addPadding'"/>
                    </xsl:if>
                    <xsl:attribute name="v-bind:class">
                        <xsl:value-of select="'{ ''d-block'': selectedPage ==='||position()||', ''d-none'':selectedPage!=='||position()||'}'"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-pgnr">
                        <xsl:value-of select="position()"/>
                    </xsl:attribute>
                    <xsl:copy-of select="current()"/>
                    <xsl:copy-of select="$nextPb"/>
                    <xsl:choose>
                        <xsl:when test="$nextPb">
                            <xsl:apply-templates select="local:split(current(), $nextPb, /tei:TEI)"
                            />
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates
                                select="local:split(current(), (/tei:TEI//element())[last()], /tei:TEI)"
                            />
                        </xsl:otherwise>
                    </xsl:choose>
                </div>
            </xsl:for-each>

        </xsl:variable>
        <div ref="readview">
            <xsl:apply-templates select="$result" mode="clean"/>
        </div>
    </xsl:template>


    <xsl:template match="tei:title">
        <xsl:value-of select="."/>
    </xsl:template>

    <xsl:template match="tei:p|p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="tei:rs">
        <xsl:choose>
            <xsl:when test="@type = 'person'">
                <entity-span id="{generate-id()}" class="person" v-on:click="navigateTo('{@ref}', '{@type}' , $event)">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.person }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </entity-span>
            </xsl:when>

            <xsl:when test="@type = 'institution'">
                <entity-span id="{generate-id()}" class="institution" v-on:click="navigateTo('{@ref}', '{@type}', $event)">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.institution }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </entity-span>
            </xsl:when>

            <xsl:when test="@type = 'place'">
                <entity-span id="{generate-id()}" class="place" v-on:click="navigateTo('{@ref}', '{@type}', $event)">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.place }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </entity-span>
            </xsl:when>

            <xsl:when test="@type = 'law'">
                <span class="law">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.law }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </span>
            </xsl:when>

            <xsl:when test="@type = 'work'">
                <entity-span id="{generate-id()}" class="work" v-on:click="navigateTo('{@ref}', '{@type}', $event)">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.work }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </entity-span>
            </xsl:when>

            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>

    </xsl:template>

    <xsl:template match="tei:quote">
        <span class="quote">
            <xsl:attribute name="v-bind:class">
                <xsl:text>{ highlighter: highlighter.quote }</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:q[@type='spoken']">
        <span class="quote-spoken">
            <xsl:attribute name="v-bind:class">
                <xsl:text>{ highlighter: highlighter.quote }</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@type = 'intertext' and starts-with(@source, 'https://fackel')]">
        <span class="fackel-ref">
            <xsl:attribute name="v-bind:class">
                <xsl:text>{ highlighter: highlighter.quote }</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@hand = '*']">
        <span class="note-hand">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'underlined']">
        <span class="hi-underlined">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'underlined' and @hand = '*']">
        <span class="hi-hand-underlined">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:hi[@rend = 'spaced']">
        <span class="hi-spaced">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add">
        <span class="add">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:add[@hand = '*']">
        <span class="add-hand">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:del">
        <span class="del">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:del[@hand = '*']">
        <span class="del-hand">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:subst">
        <span class="subst">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@type = 'marginal']">
        <span class="marginalie-text {@rend}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:metamark[@function = 'marginal' and @hand = '*' and @rend = '*']">
        <span class="metamark">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="tei:metamark[@function='transposition']">
        <xsl:variable name="target" select="@target"/>
        <xsl:variable name="ptrpos" select="$teiHeader//tei:transpose[@hand=./@hand]//tei:ptr[@target=$target]/(count(preceding-sibling::tei:ptr)+1)"/>
        <xsl:variable name="seg">
            <xsl:copy-of select="./root()//tei:seg[@type='transposition'][position()=$ptrpos]"/>
        </xsl:variable>
        <xsl:apply-templates select="$seg"/>
    </xsl:template>
    <xsl:template match="tei:seg[@type='transposition']">
        <xsl:if test="not(ancestor::*[1])">
        <xsl:apply-templates/>
        </xsl:if>
    </xsl:template>
       
    <xsl:template match="tei:note[@type = 'paratext' and @resp = 'lawfirm']">
        <span class="paratext">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:lb">
        <xsl:variable name="curbr" select="."/>
        <span class="lb" ref="linebreak{generate-id()}"/>
    </xsl:template>

    <xsl:template match="tei:lb[@break='no']">
        <xsl:variable name="curbr" select="."/>
        <span class="lb" ref="linebreak{generate-id()}">-</span>
    </xsl:template>
    <xsl:template match="tei:pb">
        <br/>
    </xsl:template>
    <xsl:template match="*[not(self::tei:pb)]" mode="clean">
        <xsl:copy>
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates select="*[not(self::tei:pb | self::tei:lb)] | text()" mode="clean"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="tei:rdg">
        <span class="rdg {if (tei:note[@rend='leftMargin']) then 'marginLeft' else ()}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>
</xsl:stylesheet>