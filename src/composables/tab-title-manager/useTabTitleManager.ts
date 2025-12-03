import { reactive, toRefs } from "vue";

const useTabTitleManager = reactive({
    currentTitle: '',
    manuallySet: false,
});

export default () => {
    const { currentTitle, manuallySet } = toRefs(useTabTitleManager);

    const setTitle = (title: string, isManual = false) => {
        currentTitle.value = title;
        manuallySet.value = isManual;
        document.title = title;
    };

    const getTitle = () => {
        return currentTitle.value;
    };

    const wasManuallySet = () => {
        return manuallySet.value;
    };

    const resetManualFlag = () => {
        manuallySet.value = false;
    }

    return {
        currentTitle,
        manuallySet,
        setTitle,
        getTitle,
        wasManuallySet,
        resetManualFlag
    }
};