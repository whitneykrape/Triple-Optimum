# Triple Optimum Blocks
Repositioning this into 2 main pieces. 
1. A series of HTML blocks into patterns built "backwards" from WP blocks. (WP has much cleaner HTML than other similar WYSIWYG editors, Hubspot, SquareSpace, etc...)
2. Plugin blocks for WordPress (but hopefully also HTML) for slightly more UX/UI potential. 

All blocks and patterns should be:
1. Plug-and-play. No external libraries unless needed for very specific needs such as mobile interactivity or accessibility.
2. Coded in ES6 (overall ES next) with @wordpress/scripts.
3. Performant, with lean backend and frontend includes, fully contained, non-colliding CSS, so forth.

Edit:
Adding some plugin blocks that can't be built from core WordPress blocks, so far Modal and Tabbed items. Bootstrapped with WordPress scripts. Credit to Mark Bird, https://github.com/merbird, for their modal block (though not a fork, their code is great for reference.)