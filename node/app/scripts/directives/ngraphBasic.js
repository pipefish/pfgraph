(function () {
  'use strict';

  angular.module('pfgraphApp.directives')

      .directive('ngraphGraph', function() {
      return {
        restrict: 'E',
        scope: {
          graph: "=",
          data: "="
        },
        link: function(scope, iElement, iAttrs) {

          var createPixiGraphics = require('pixigraphics'),
              forcelayout = require('ngraph.forcelayout'),
              physics = require('ngraph.physics.simulator');

          if(typeof (scope.graph) == "undefined") {
            scope.graph = require('ngraph.graph');
          }

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            function deleteLinks(graph) {
              var deferred = $q.defer();
              var promises=[];
              graph.forEachLink(function(link) {
                var linkdeferred = $q.defer();
                promises.push(linkdeferred);
                graph.removeLink(link);
                linkdeferred.resolve();
              });
              $q.all(promises).then(function() { deferred.resolve(); });
              return deferred.promise;
            }
            function addLinks(graph,neighbors) {
              var deferred = $q.defer();
              angular.forEach(neighbors, function(value,key) {
                graph.addLink(id,value.neighbor,value.distance);
              });
              deferred.resolve();
              return deferred.promise;
            }
            function deleteOrphans(graph) {
              var deferred = $q.defer();
              var promises=[];
              graph.forEachNode(function(node) {
                var nodedeferred = $q.defer();
                promises.push(nodedeferred);
                if(node.links.length==0) {
                  graph.removeNode(node.id);
                }
              });
            }

            return deleteLinks(scope.graph)
            .then(addLinks(scope.graph,newVals))
            .then(deleteOrphans(scope.graph));
          }, true);

          var layout = forcelayout(scope.graph, physics({
                  springLength: 30,
                  springCoeff: 0.0008,
                  dragCoeff: 0.01,
                  gravity: -1.2,
                  theta: 1
                }));

          var graphics = createPixiGraphics(scope.graph, layout, iElement[0]);

          // First, let's initialize a custom data structure to help us
          // store custom information for rendering (like node color, width, etc.)
          graphics.createNodeUI(function (node) {
            return {
              width: 2 + Math.random() * 20,
              color: 0x000000
            };
          }).createLinkUI(function (link) {
            return {
              color: 0x000000
            };
          });

          // Second, let's tell graphics how we actually want to render each node and link:
          graphics.renderNode(function (node, ctx) {
            ctx.lineStyle(0);
            ctx.beginFill(node.color);
            var x = node.pos.x - node.width/2,
                y = node.pos.y - node.width/2;

            ctx.drawRect(x, y, node.width, node.width);
          }).renderLink(function (link, ctx) {
            ctx.lineStyle(1, link.color);
            ctx.moveTo(link.from.x, link.from.y);
            ctx.lineTo(link.to.x, link.to.y);
          });

          // Listen to mouse events and update graph acoordingly:
          var bindGlobalInput = require('globalinput');
          bindGlobalInput(graphics, layout);

          // begin frame rendering loop:
          renderFrame();

          function renderFrame() {
            graphics.renderFrame();
            requestAnimFrame(renderFrame);
          }
        } // link
      };  // return
    });

}());
