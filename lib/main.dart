import 'package:english_words/english_words.dart' as prefix0;
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'package:my_first_app/random_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Some Name Generator",
      home: RandomWords(),
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
    );
  }  
}

class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 16.0, color: Colors.blue);
  final Set<WordPair> _saved = Set<WordPair>();

  @override
  Widget build(BuildContext context) {  
    final wordPair = WordPair.random();
    final returnText = Text.rich(
      TextSpan(
        text: 'Hello\n', // default text style
        children: <TextSpan>[
          TextSpan(
            text: wordPair.asPascalCase, 
            style: TextStyle(
              fontStyle: FontStyle.italic,
              color: Colors.red.withOpacity(0.8),
              fontSize: 18,
            ),  
          ),
          TextSpan(text: '\nworld', style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );

    final returnScaffold = Scaffold(
      appBar: AppBar(
        title: Text("Some Name Generator"),
        actions: <Widget>[
          IconButton(icon: Icon(Icons.list), onPressed: _pushSaved,),
        ],
      ),
      body: _buildSuggestions(),
    );

    return returnScaffold;
  }

  Widget _buildSuggestions(){
    return ListView.builder(
      padding: const EdgeInsets.all(14.0),
      itemBuilder: (context, i){
        if (i.isOdd) return Divider();
        final index = i ~/ 2;

        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }

        return _buldRow(_suggestions[index]);
        },
      );
    }
        
  Widget _buldRow(WordPair pair){
    final bool alreadySaved = _saved.contains(pair);

    final text = Text(
      pair.asPascalCase,
      style: _biggerFont,
    );
    var icon = Icon(
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    );

    var listTile = ListTile(
      title: text,
      trailing: icon,
      onTap: (){
        setState(() {
          if(alreadySaved){
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      }
    );
    return listTile;
  }

  void _pushSaved() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (BuildContext context) {
          final Iterable<ListTile> tiles = _saved.map(
            (WordPair pair) {
              return ListTile(
                title: Text(pair.asPascalCase, style: _biggerFont),
              );
            },
          );
          final List<Widget> divided = ListTile.divideTiles(context: context, tiles: tiles).toList();
          return Scaffold(
            appBar: AppBar(
              title: Text("Saved Suggestions"),
            ),
            body: ListView(children: divided,),
          );
        }
      )
    );
  }
}

