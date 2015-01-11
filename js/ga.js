// Anna: moved google analytics stuff into it's own file that's being loaded asynchronously

function ga() {
	(function(w,g){w.GoogleAnalyticsObject=g;
	w[g]=w[g]||function(){(w[g].q=w[g].q||[]).push(arguments);};w[g].l=1*new Date();})(window,'ga');

	// TODO: replace with your Google Analytics profile ID.
	ga('create', 'UA-XXXX-Y');
	ga('send', 'pageview');
}

window.addEventListener("load", function(event) {
  ga();
});