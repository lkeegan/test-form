import { get, writable } from "svelte/store";

import { extendDetails } from "$lib/extentDetails";
import { formQuestions } from "$lib/questions";

const initialData: Data = generateEmptyDataObject(extendDetails, formQuestions)

function generateEmptyDataObject(extentDetails: ExtentDetails, questions: Questions) {

    /* create empty data object */
	const data: Data = { extentDetails: {} as FormDataExtentDetails, lectures: [] as FormDataLectures, questions: {} as FormDataQuestions };
	
    for (const extentDetail of extentDetails){
		data['extentDetails'][extentDetail] = undefined
	} 
	
    /* add first lecture for convienience */
    data.lectures = [{ name: '', points: 0, description: '', subject: undefined, skills: {}}]
	
    for (const question of questions) {
		data['questions'][question] = '';
	}

	return data;
}

export const data = writable<Data>(initialData)

export function addLecture(){
    let newLecture: Lecture = { name: '', points: 0, description: '', subject: undefined, skills: {}}

    data.update((data: Data) => {
        data.lectures = [...data.lectures, newLecture]
        return data
    })
}

export function deleteLecture(idx: number){
    data.update((data: Data) => {    
    data.lectures.splice(idx ,1); 
    return data
    })
}

export function countSubjectCP(subject: Subject) {

    const _data = get(data);

    const extentDuration = _data.extentDetails["duration"]
    const extentPoints = _data.extentDetails["points"]

    if (!extentDuration || !extentPoints ) return 0;

    const pointEquivalent = (180 / extentPoints)  * (extentDuration / 36)

    const points = _data.lectures.reduce((sum, lecture) => 
        lecture.subject === subject ? sum + lecture.points : sum, 0);

    const cp = points * pointEquivalent

    return Math.round(cp * 100) /100
} 