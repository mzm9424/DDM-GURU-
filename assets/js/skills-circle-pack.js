/**
 * D3.js Circular Packing Chart - Skills & Tools Proficiency
 * DDmGurU Portfolio
 */

(function () {
  'use strict';

  var skillsData = {
    name: "DDmGurU Skills",
    children: [
      {
        name: "Design Tools",
        id: "design-tools",
        colorDark: "#ff6b6b",
        colorLight: "#e11d48",
        bgDark: "rgba(255, 107, 107, 0.12)",
        bgLight: "rgba(225, 29, 72, 0.08)",
        strokeDark: "rgba(255, 107, 107, 0.4)",
        strokeLight: "rgba(225, 29, 72, 0.3)",
        children: [
          { name: "Figma", value: 96, experience: "Expert", category: "Design Tools", desc: "Design systems, auto-layout, interactive component prototypes & variables" },
          { name: "Photoshop", value: 92, experience: "Advanced", category: "Design Tools", desc: "Photo retouching, creative composites, raster manipulation & asset export" },
          { name: "Illustrator", value: 90, experience: "Advanced", category: "Design Tools", desc: "Vector graphics, branding identity, custom iconography & logo marks" },
          { name: "Adobe XD", value: 86, experience: "Proficient", category: "Design Tools", desc: "Rapid screen wireframing, transitions & collaborative developer specs" },
          { name: "After Effects", value: 82, experience: "Proficient", category: "Design Tools", desc: "Kinetic UI animations, Lottie exports, social video assets & motion logos" },
          { name: "Blender 3D", value: 74, experience: "Intermediate", category: "Design Tools", desc: "Spatial 3D object modeling, materials, mockups & scene rendering" }
        ]
      },
      {
        name: "UI/UX Systems",
        id: "ui-ux",
        colorDark: "#20e3b2",
        colorLight: "#0d9488",
        bgDark: "rgba(32, 227, 178, 0.12)",
        bgLight: "rgba(13, 148, 136, 0.08)",
        strokeDark: "rgba(32, 227, 178, 0.4)",
        strokeLight: "rgba(13, 148, 136, 0.3)",
        children: [
          { name: "Wireframing", value: 95, experience: "Expert", category: "UI/UX Systems", desc: "Low-to-high fidelity user flows, sitemaps & layout architecture" },
          { name: "Design Systems", value: 93, experience: "Advanced", category: "UI/UX Systems", desc: "Design tokens, atomic principles, multi-platform documentation" },
          { name: "User Research", value: 88, experience: "Advanced", category: "UI/UX Systems", desc: "User interviews, persona development, empathy maps & surveys" },
          { name: "Usability Testing", value: 89, experience: "Advanced", category: "UI/UX Systems", desc: "A/B testing, cognitive walkthroughs, click-tracking & task validation" },
          { name: "Accessibility", value: 90, experience: "Advanced", category: "UI/UX Systems", desc: "WCAG 2.1 compliance, contrast validation & screen reader readiness" },
          { name: "Micro-interactions", value: 92, experience: "Advanced", category: "UI/UX Systems", desc: "Delightful UI feedback, hover choreographies & responsive states" }
        ]
      },
      {
        name: "Web & Frontend",
        id: "web-frontend",
        colorDark: "#00f2fe",
        colorLight: "#0284c7",
        bgDark: "rgba(0, 242, 254, 0.12)",
        bgLight: "rgba(2, 132, 199, 0.08)",
        strokeDark: "rgba(0, 242, 254, 0.4)",
        strokeLight: "rgba(2, 132, 199, 0.3)",
        children: [
          { name: "HTML5 Semantic", value: 97, experience: "Expert", category: "Web & Frontend", desc: "Clean semantic markup, SEO readiness & modern HTML specifications" },
          { name: "CSS3 / Tailwind", value: 95, experience: "Expert", category: "Web & Frontend", desc: "Grid, flexbox, custom CSS properties, responsive breakpoints & utility CSS" },
          { name: "JavaScript ES6+", value: 91, experience: "Advanced", category: "Web & Frontend", desc: "Async architecture, modern ES modules, DOM manipulation & web APIs" },
          { name: "GSAP Animation", value: 92, experience: "Advanced", category: "Web & Frontend", desc: "ScrollTrigger, timeline choreographies, split text & smooth motion" },
          { name: "D3.js Data Viz", value: 88, experience: "Advanced", category: "Web & Frontend", desc: "SVG hierarchy layouts, circular packing, scales, data binds & transitions" },
          { name: "TypeScript", value: 84, experience: "Proficient", category: "Web & Frontend", desc: "Type safety, robust component contracts & scalable maintainability" },
          { name: "React / Next.js", value: 86, experience: "Proficient", category: "Web & Frontend", desc: "Functional components, custom hooks, reactive state & modular views" }
        ]
      },
      {
        name: "Platforms & CMS",
        id: "platforms-cms",
        colorDark: "#ffb300",
        colorLight: "#d97706",
        bgDark: "rgba(255, 179, 0, 0.12)",
        bgLight: "rgba(217, 119, 6, 0.08)",
        strokeDark: "rgba(255, 179, 0, 0.4)",
        strokeLight: "rgba(217, 119, 6, 0.3)",
        children: [
          { name: "Webflow", value: 93, experience: "Advanced", category: "Platforms & CMS", desc: "Visual CMS collections, bespoke animations, interactions & custom code" },
          { name: "WordPress", value: 89, experience: "Advanced", category: "Platforms & CMS", desc: "Custom themes, WooCommerce storefronts, security & plugin ecosystem" },
          { name: "Shopify", value: 85, experience: "Proficient", category: "Platforms & CMS", desc: "Liquid templating, store configuration, inventory & checkout flows" },
          { name: "Git & GitHub", value: 89, experience: "Advanced", category: "Platforms & CMS", desc: "Branching strategies, CI/CD with GitHub Actions & version control" },
          { name: "SEO Optimization", value: 91, experience: "Advanced", category: "Platforms & CMS", desc: "Lighthouse 95+ performance, JSON-LD structured data & meta audits" }
        ]
      }
    ]
  };

  function isLightMode() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function initCircularPackChart(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (typeof d3 === 'undefined') {
      console.warn('D3.js is not loaded yet.');
      return;
    }

    // Clear previous renders if re-initializing
    container.innerHTML = '';

    var width = 800;
    var height = 800;
    var currentFocus = null;
    var view;

    // Create Tooltip DOM if not already present
    var tooltip = container.querySelector('.skills-pack-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'skills-pack-tooltip';
      container.appendChild(tooltip);
    }

    var light = isLightMode();

    // Color helpers based on current theme
    function getDomainColor(d) {
      var p = d.depth === 1 ? d.data : (d.depth === 2 ? d.parent.data : null);
      if (!p) return light ? '#64748b' : '#94a3b8';
      return light ? p.colorLight : p.colorDark;
    }

    function getCircleFill(d) {
      if (d.depth === 0) {
        return 'transparent';
      }
      var p = d.depth === 1 ? d.data : d.parent.data;
      if (d.depth === 1) {
        return light ? p.bgLight : p.bgDark;
      }
      // Leaf circle fill with opacity gradient effect
      var baseColor = light ? p.colorLight : p.colorDark;
      var alpha = 0.15 + (d.data.value / 100) * 0.25;
      return d3.color(baseColor).copy({ opacity: alpha });
    }

    function getCircleStroke(d) {
      if (d.depth === 0) return 'none';
      var p = d.depth === 1 ? d.data : d.parent.data;
      if (d.depth === 1) {
        return light ? p.strokeLight : p.strokeDark;
      }
      return light ? p.colorLight : p.colorDark;
    }

    // Hierarchy & Layout
    var root = d3.hierarchy(skillsData)
      .sum(function (d) { return d.value || 0; })
      .sort(function (a, b) { return b.value - a.value; });

    var pack = d3.pack()
      .size([width, height])
      .padding(function (d) { return d.depth === 1 ? 16 : 8; });

    pack(root);

    currentFocus = root;

    // Create SVG
    var svg = d3.select(container)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', '100%')
      .style('display', 'block')
      .style('cursor', 'pointer')
      .on('click', function (event) {
        if (event.target.tagName === 'svg') {
          zoom(event, root);
        }
      });

    // Defs for filters / gradients
    var defs = svg.append('defs');

    // Subtle glow filter
    var filter = defs.append('filter')
      .attr('id', 'pack-glow-' + containerId)
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', 4)
      .attr('result', 'coloredBlur');

    var feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    var g = svg.append('g');

    // Circles
    var node = g.selectAll('circle')
      .data(root.descendants().slice(1))
      .join('circle')
      .attr('class', function (d) {
        return d.children ? 'pack-circle-parent' : 'pack-circle-leaf';
      })
      .attr('fill', function (d) { return getCircleFill(d); })
      .attr('stroke', function (d) { return getCircleStroke(d); })
      .attr('stroke-width', function (d) { return d.children ? 1.5 : 2; })
      .attr('stroke-dasharray', function (d) { return d.children ? '4 3' : 'none'; })
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        if (!d.children) {
          d3.select(this)
            .attr('stroke-width', 3.5)
            .attr('filter', 'url(#pack-glow-' + containerId + ')');

          showTooltip(event, d);
        } else {
          d3.select(this).attr('stroke-width', 2.5);
        }
      })
      .on('mousemove', function (event, d) {
        if (!d.children) {
          moveTooltip(event);
        }
      })
      .on('mouseout', function (event, d) {
        if (!d.children) {
          d3.select(this)
            .attr('stroke-width', 2)
            .attr('filter', null);

          hideTooltip();
        } else {
          d3.select(this).attr('stroke-width', 1.5);
        }
      })
      .on('click', function (event, d) {
        if (currentFocus !== d) {
          zoom(event, d.children ? d : d.parent);
          event.stopPropagation();
        }
      });

    // Parent group titles (Cluster headers)
    var parentLabels = g.selectAll('text.pack-label-parent')
      .data(root.children)
      .join('text')
      .attr('class', 'pack-label pack-label-parent')
      .attr('fill', function (d) { return getDomainColor(d); })
      .text(function (d) { return d.data.name; });

    // Leaf nodes text labels
    var leafLabels = g.selectAll('g.pack-leaf-group')
      .data(root.leaves())
      .join('g')
      .attr('class', 'pack-leaf-group')
      .style('pointer-events', 'none');

    leafLabels.append('text')
      .attr('class', 'pack-label pack-label-leaf')
      .attr('fill', function () { return isLightMode() ? '#0f172a' : '#ffffff'; })
      .attr('dy', '-0.2em')
      .text(function (d) {
        return d.data.name;
      });

    leafLabels.append('text')
      .attr('class', 'pack-label pack-label-sub')
      .attr('fill', function (d) { return getDomainColor(d); })
      .attr('dy', '1.1em')
      .text(function (d) {
        return d.data.value + '%';
      });

    // Zoom setup
    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      var k = width / v[2];
      view = v;

      node.attr('transform', function (d) {
        return 'translate(' + ((d.x - v[0]) * k + width / 2) + ',' + ((d.y - v[1]) * k + height / 2) + ')';
      });

      node.attr('r', function (d) {
        return d.r * k;
      });

      // Update parent labels positions
      parentLabels
        .attr('transform', function (d) {
          var yPos = (d.y - v[1]) * k + height / 2 - (d.r * k) + 16;
          return 'translate(' + ((d.x - v[0]) * k + width / 2) + ',' + yPos + ')';
        })
        .style('display', function (d) {
          return (d.r * k > 50) ? 'inline' : 'none';
        });

      // Update leaf labels positions & visibility
      leafLabels
        .attr('transform', function (d) {
          return 'translate(' + ((d.x - v[0]) * k + width / 2) + ',' + ((d.y - v[1]) * k + height / 2) + ')';
        })
        .style('display', function (d) {
          // Hide text if circle is too small to avoid ugly clutter
          return (d.r * k > 26) ? 'inline' : 'none';
        });

      leafLabels.selectAll('.pack-label-leaf')
        .style('font-size', function (d) {
          var radius = d.r * k;
          var len = d.data.name.length;
          var calc = Math.min(14, Math.max(9, (radius * 1.7) / len));
          return calc + 'px';
        });

      leafLabels.selectAll('.pack-label-sub')
        .style('display', function (d) {
          return (d.r * k > 34) ? 'inline' : 'none';
        });
    }

    function zoom(event, d) {
      currentFocus = d;

      var transition = svg.transition()
        .duration(event && event.altKey ? 7500 : 750)
        .tween('zoom', function () {
          var i = d3.interpolateZoom(view, [currentFocus.x, currentFocus.y, currentFocus.r * 2]);
          return function (t) { zoomTo(i(t)); };
        });
    }

    // Tooltip Helpers
    function showTooltip(event, d) {
      var data = d.data;
      var domainColor = getDomainColor(d);

      tooltip.innerHTML =
        '<div class="skills-tooltip-header">' +
          '<h5 class="skills-tooltip-title">' + data.name + '</h5>' +
          '<span class="skills-tooltip-badge" style="color:' + domainColor + '">' + data.experience + '</span>' +
        '</div>' +
        '<div class="skills-tooltip-category">' + data.category + '</div>' +
        '<div class="skills-tooltip-desc">' + data.desc + '</div>' +
        '<div class="skills-tooltip-bar-wrap">' +
          '<div class="skills-tooltip-bar" style="width:' + data.value + '%; background:' + domainColor + '"></div>' +
        '</div>' +
        '<div class="skills-tooltip-footer">' +
          '<span>Proficiency</span>' +
          '<span style="color:' + domainColor + '">' + data.value + '%</span>' +
        '</div>';

      tooltip.style.opacity = '1';
      moveTooltip(event);
    }

    function moveTooltip(event) {
      var rect = container.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      tooltip.style.left = Math.max(110, Math.min(rect.width - 110, x)) + 'px';
      tooltip.style.top = (y - 12) + 'px';
    }

    function hideTooltip() {
      tooltip.style.opacity = '0';
    }

    // Attach external controls (filter buttons, reset view)
    var filterButtons = document.querySelectorAll('[data-skills-filter]');
    filterButtons.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-skills-filter');
        if (filter === 'all') {
          zoom(e, root);
        } else {
          var targetGroup = root.children.find(function (child) {
            return child.data.id === filter;
          });
          if (targetGroup) {
            zoom(e, targetGroup);
          }
        }
      };
    });

    var resetBtn = document.getElementById('resetSkillsZoom');
    if (resetBtn) {
      resetBtn.onclick = function (e) {
        e.preventDefault();
        filterButtons.forEach(function (b) {
          if (b.getAttribute('data-skills-filter') === 'all') {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
        zoom(e, root);
      };
    }

    // Listen for theme changes to adapt SVG colors smoothly
    window.addEventListener('themechange', function () {
      light = isLightMode();

      node.transition().duration(400)
        .attr('fill', function (d) { return getCircleFill(d); })
        .attr('stroke', function (d) { return getCircleStroke(d); });

      parentLabels.transition().duration(400)
        .attr('fill', function (d) { return getDomainColor(d); });

      leafLabels.selectAll('.pack-label-leaf').transition().duration(400)
        .attr('fill', function () { return light ? '#0f172a' : '#ffffff'; });

      leafLabels.selectAll('.pack-label-sub').transition().duration(400)
        .attr('fill', function (d) { return getDomainColor(d); });
    });
  }

  // Auto-initialize when ready
  function init() {
    initCircularPackChart('skillsCircularPack');
    initCircularPackChart('skillsCircularPackIndex');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.DDmSkillsPack = {
    init: initCircularPackChart,
    data: skillsData
  };
})();
