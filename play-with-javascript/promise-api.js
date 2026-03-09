

// ------------------------------------------
// trainer module
// ------------------------------------------


const trainer = {
    getTopic: function (topic) {
        const executor = function (resolve, reject) {
            setTimeout(function () {
                const topicDetails = {
                    'topic': topic,
                    'duration': 1000
                };
                console.log("trainer is pushing topic details to student...");
                resolve(topicDetails); // push
            }, 2000);
        }
        const promise = new Promise(executor);
        return promise;
    }
}

//------------------------------------------
// consumer module
// ------------------------------------------

const student = {
    doLearning: async function () {
        try {
            console.log("student is asking trainer for topic...");
            let promise = trainer.getTopic('JavaScript');
            console.log("student got the promise and deferred learning actions to the promise...");
            const topicDetails = await promise; // pull
            console.log("student got topic details from trainer and start learning...");
            console.log(topicDetails);
        } catch (error) {
            console.log("student got error from trainer...");
            console.log(error);
        }
    },
    doLearnAndWork: function () {
        console.log("student want to learn from trainer");
        this.doLearning();
        console.log("student is doing some work...");
    }
}

student.doLearnAndWork();