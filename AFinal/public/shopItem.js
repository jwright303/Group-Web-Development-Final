(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['shopItem'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"shop-item\">\n	<div class=\"image-container\">\n		<img class=\"shop-item-image\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":3,"column":36},"end":{"line":3,"column":43}}}) : helper)))
    + "\"/>\n	</div>\n	<div class=\"item-info\">\n		<div class=\"item-info-sameline\">\n			<p class=\"item-caption\">\n				<a href=\"#\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"caption") || (depth0 != null ? lookupProperty(depth0,"caption") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":27}}}) : helper)))
    + "</a>\n			</p>\n			<i class=\"fa fa-heart like-button-heart\"></i>\n			<p class=\"like-number\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"likes") || (depth0 != null ? lookupProperty(depth0,"likes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"likes","hash":{},"data":data,"loc":{"start":{"line":11,"column":26},"end":{"line":11,"column":35}}}) : helper)))
    + "</p>\n		</div>\n		<p class=\"item-price\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":13,"column":24},"end":{"line":13,"column":33}}}) : helper)))
    + "</p>\n		<button type=\"button\" class=\"item-like-button\">Like</button>\n		<button type=\"button\" class=\"item-addtocart-button\">Add to cart</button>\n	</div>	\n</section>";
},"useData":true});
})();