<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns:v-on="http://example.com/v-on" xmlns:v-bind="http://example.com/v-bind" xmlns:local="http://example.com"
    exclude-result-prefixes="xs tei v-on local" version="2.0">
    <xsl:output encoding="UTF-8" media-type="text/html" method="html" version="5.0" indent="yes"/>
    <!-- fragmenting function based on https://wiki.tei-c.org/index.php/Milestone-chunk.xquery -->
    
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

                    <xsl:when test="
                            some $n in $node/descendant::*
                                satisfies ($n is $ms1 or $n is $ms2)">
                        <xsl:element name="{$node/local-name()}">
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
    <xsl:template match="/">
        <xsl:variable name="addedlinenumbers">
           
                
                    <xsl:apply-templates select="." mode="addl"/>
                
            
        </xsl:variable>
        <xsl:variable name="result">
            <xsl:for-each select="$addedlinenumbers/tei:TEI//tei:pb">
                <xsl:variable name="nextPb" select="current()/following::tei:pb[1]"/>
                <div>
                    <xsl:attribute name="v-bind:class">
                        <xsl:value-of select="'{ ''visible font-inherit'': selectedPage ==='||position()||', ''invisible font-zero'':selectedPage!=='||position()||'}'"/>
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
        <div>
            <xsl:apply-templates select="$result" mode="clean"/>
        </div>
    </xsl:template>
<xsl:template match="tei:lb" mode="addl">
    <xsl:copy>
        <xsl:attribute name="n" select="count(preceding::tei:lb) + 1"/>
    </xsl:copy>
</xsl:template>
    <xsl:template match="@*|node()" mode="addl">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()" mode="addl"/>
    </xsl:copy>
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
                <entity-span class="person" v-on:click="navigateTo('{@ref}')">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.person }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </entity-span>
            </xsl:when>

            <xsl:when test="@type = 'institution'">
                <span class="institution">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.institution }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </span>
            </xsl:when>

            <xsl:when test="@type = 'place'">
                <span class="place">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.place }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </span>
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
                <span class="work">
                    <xsl:attribute name="v-bind:class">
                        <xsl:text>{ highlighter: highlighter.work }</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </span>
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

    <xsl:template match="tei:note[@type = 'marginal'][@hand][@rend]">
        <span class="marginalie-text {@rend}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:metamark[@function = 'marginal' and @hand = '*' and @rend = '*']">
        <span class="metamark">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:note[@type = 'paratext' and @resp = 'lawfirm']">
        <span class="paratext">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="tei:lb">
        <br/><span class="lb{if (@n mod 5 = 0) then ' visibleline' else ()}"/>
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

</xsl:stylesheet>
