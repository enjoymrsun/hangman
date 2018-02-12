defmodule Hangman.Game do
  def new do
    %{
      word: next_word(),
      guesses: [],
    }
  end

  def client_view(game) do
    ws = String.graphemes(game.word)
    gs = game.guesses
    %{
      skel: skeleton(ws, gs),
      goods: Enum.filter(gs, &(Enum.member?(ws, &1))),
      bads: Enum.filter(gs, &(!Enum.member?(ws, &1))),
      max: max_guesses(),
    }
  end

  defp skeleton(word, guesses) do
    Enum.map word, fn cc ->
      if Enum.member?(guesses, cc) do
        cc
      else
        "_"
      end
    end
  end

  def guess(game, letter) do
    gs = game.guesses
    |> MapSet.new()
    |> MapSet.put(letter)
    |> MapSet.to_list

    Map.put(game, :guesses, gs)
  end

  defp max_guesses do
    10
  end

  def next_word do
    words = ~w(
      horse snake jazz violin book computer google facebook linkedin
      muffin cookie pizza sandwich amazon bag cake cat dog rat sockets
      house train clock chinese playoff celtics lakers warriors nba clothes
      parsnip marshmallow steak cheese pierce latex racket nba2k crossfire
      hoop tatum language word world laptop cokecola seasome chicken prok
      color silc finance economics burger rice noodle egg great brilliant
      youarebig better system language desk chair icecream redsockets green
      yellow white blue beard harden paul dfs bfs union-find fighting work-hard
      miss you strong mouse china mexican american boston losangeles seattle
      green number binary traversal pen writing xiangshi sleep health good
    )
    Enum.random(words)
  end
end
