// noinspection JSXNamespaceValidation

import { defineComponent } from 'vue'
import { CoreDotType } from '@/model/entity/CoreDot'
import ShowImage from './ShowDot/ShowImage.vue'
import ShowLink from './ShowDot/ShowLink.vue'
import ShowQuestions from './ShowDot/ShowQuestions.vue'
import ShowText from './ShowDot/ShowText.vue'

export default defineComponent({
    props: {
        data: Object,
        videoScreen: Boolean,
    },
    emits: ['videoStop'],
    render() {
        const type = this.$props.data?.type
        const sereen = this.$props.videoScreen
        let Show = <span>{ type } -- </span>
        switch (type as CoreDotType) {
            case CoreDotType.图片:
                Show = <ShowImage />
                break
            case CoreDotType.文本:
                Show = <ShowText></ShowText>
                break
            case CoreDotType.链接:
                Show = <ShowLink></ShowLink>
                break
            case CoreDotType.题目:
                Show = <ShowQuestions></ShowQuestions>
                break
            default:
        }

        // @ts-ignore
        return <Show data={ this.$props.data } onVideoStop={ () => this.$emit('videoStop') } class="display-expanded"></Show>
    },
})

