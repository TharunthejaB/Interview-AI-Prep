const Session = require("../models/Session")
const Question = require("../models/Question")




exports.addQuestionsToSessions = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({message: "Invalid Input data"})
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({message:"Session not found"})
        }
        console.log("1. Start");
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer     
            }))
        )
        console.log("3. Questions inserted");
        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();
        console.log("4. Session saved");
        return res.status(200).json({
      success: true,
      message: "Questions added successfully",
      data: createdQuestions,
    });
        }
        catch(e){
            res.status(500).json({sucess:false,message:"Server error"})
    }
}
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res
                .status(404)
            .json({message:"Question not found"})
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({sucess:true, question})
        }
        catch(e){
            res.status(500).json({sucess:false,message:"Server error"})
    }
}
        
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);
        if (!question) {
            res.status(400).json({sucess: false, message: "Question not found"})
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({ sucess: true, question });
        }
        catch(e){
            res.status(500).json({sucess:false,message:"Server error"})
    }
}
        

        
