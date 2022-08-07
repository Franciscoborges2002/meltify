var term = require( 'terminal-kit' ).terminal;
/* const cliSpinners = require('cli-spinners');
const ora = require('ora') */

term( 'Starting ' ).bold( 'Meltify.\n' );
var progressBar , progress = 0 ;

//Progress bar for the start
/* function doProgress()
{
	// Add random progress
	progress += Math.random() / 10 ;
	progressBar.update( progress ) ;
	
	if ( progress >= 1 )
	{
		// Cleanup and exit
		setTimeout( function() { term( '\n' ) ; process.exit() ; } , 200 ) ;
	}
	else
	{
		setTimeout( doProgress , 100 + Math.random() * 400 ) ;
	}
}


progressBar = term.progressBar( {
	width: 80 ,
	eta: true ,
	percent: true
} ) ;

doProgress() ; */



function firstQuestion(){
    var items = [
        'Melt',
        'Forge'
    ] ;
    
    term.singleColumnMenu( items , function( error , response ) {
        term( '\n' ).eraseLineAfter.magenta(
            "#%s selected: %s (%s,%s)\n" ,
            response.selectedIndex ,
            response.selectedText ,
            response.x ,
            response.y
        ) ;
        process.exit() ;
    } ) ;
}

function secondQuestion(){
    var items = [
        'Scrap',
        'Reclaimed', 
        'Refined'
    ] ;
    
    term.singleColumnMenu( items , function( error , response ) {
        term( '\n' ).eraseLineAfter.magenta(
            "#%s selected: %s (%s,%s)\n" ,
            response.selectedIndex ,
            response.selectedText ,
            response.x ,
            response.y
        ) ;
        process.exit() ;
    } ) ;
}

secondQuestion();

/* term.inputField({
    echo: false,
    cancelable: true,
    autoComplete :['Scrap', 'Reclaimed', 'Refined', 'scrap', 'reclaimed', 'refined']
}, (err, input)=>{
    if(err)
        throw new Error('Error')
}) */