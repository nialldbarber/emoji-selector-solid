import { Component, createEffect, createSignal } from 'solid-js'
import type { JSX } from 'solid-js'
import { VirtualContainer } from '@minht11/solid-virtual-container'
import { emojis } from './constants/emojis'
import {
  formatEmojisIntoArray,
  updatedEmojiListWithInput,
} from './libs/emojis'

const H: Component<{ text: string }> = (props) => {
  return (
    <h1 class="flex justify-center text-4xl mt-5">
      {props.text}
    </h1>
  )
}

const EmojiItem: Component<{
  style: any
  tabIndex: number
  item: string
}> = (props) => {
  return (
    <div
      style={props.style}
      class="listItem"
      tabIndex={props.tabIndex}
      role="listitem"
    >
      <div>{props.item}</div>
    </div>
  )
}

const EmojiList: Component = (props) => {
  let scrollTargetElement!: HTMLDivElement
  return (
    <div class="section">
      <div class="scrollContainer" ref={scrollTargetElement}>
        <VirtualContainer
          items={props.emojis}
          scrollTarget={scrollTargetElement}
          itemSize={{ height: 50 }}
        >
          {EmojiItem}
        </VirtualContainer>
      </div>
    </div>
  )
}

const App: Component = () => {
  const [input, setInput] = createSignal('')

  const onInput: JSX.EventHandler<
    HTMLInputElement,
    InputEvent
  > = (event) => {
    setInput(event.currentTarget.value)
  }

  const _emojis = updatedEmojiListWithInput(
    formatEmojisIntoArray(emojis),
    input
  )

  return (
    <main>
      <H text="Emoji Selector" />
      <div class="flex flex-col justify-center items-center mt-10 mb-5">
        <input
          class="bg-gray-200 w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          value={input()}
          placeholder="Start typing..."
          onInput={onInput}
        />
        <p>Click a row to copy to emoji!</p>
        <p>The value is {input()}</p>
        <EmojiList emojis={_emojis} />
      </div>
    </main>
  )
}

export default App
