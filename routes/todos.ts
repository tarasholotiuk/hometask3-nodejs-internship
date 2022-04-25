import { Router } from "express";
import Task from "../services/todo";
import { parseDate, setIconTask } from "../helpers/helpers";
import { tasksForInitial, categories } from "../repositories/repo";

export const router = Router();

router.get("/", async (req, res) => {
	const tasks = await Task.find().lean();
	res.render("index", {
		title: "ToDo",
		tasks: tasks.filter((task) => task.isArchived === false),
		categories,
		helpers: {
			countActive: (item: string) => {
				const result = tasks
					.filter(
						(task: { category: string; isArchived: boolean }) =>
							task.category === item && task.isArchived == false
					)
					.length.toString();
				return result;
			},
			countArchived: (item: string) => {
				const result = tasks
					.filter(
						(task: { category: string; isArchived: boolean }) =>
							task.category === item && task.isArchived == true
					)
					.length.toString();
				return result;
			},
		},
	});
});

router.get("/archive", async (req, res) => {
	const tasks = await Task.find().lean();
	res.render("archive", {
		title: "Archive",
		tasks: tasks.filter((task) => task.isArchived === true),
	});
});

router.get("/inputForm", (req, res) => {
	res.render("inputForm", {
		title: "New Task",
		categories,
	});
});

router.post("/addToDo", async (req, res) => {
	try {
		const task = new Task({
			name: req.body.name,
			category: req.body.category,
			content: req.body.content,
			dates: parseDate(req.body.content),
			iconTask: setIconTask(req.body.category),
		});
		await task.save();
		res.redirect("/");
	} catch (err) {
		console.log(err);
		res.render("inputForm", {
			categories,
			error: err,
		});
	}
});

router.post("/deleteAll", async (req, res) => {
	Task.deleteMany({}, () => {});
	res.redirect("/");
});

router.post("/fillBase", async (req, res) => {
	const saveBase = new Promise((resolve, reject) => {
		resolve(Task.insertMany(tasksForInitial));
	});
	saveBase.then(() => {
		res.redirect("/");
	});
});

router.post("/archiveItem", async (req, res) => {
	const todo = await Task.findById(req.body.id);
	todo.isArchived = true;
	await todo.save();
	res.redirect("/");
});

router.post("/unarchiveItem", async (req, res) => {
	const todo = await Task.findById(req.body.id);
	todo.isArchived = false;
	await todo.save();
	res.redirect("/archive");
});

router.post("/deleteItem", async (req, res) => {
	await Task.deleteOne({ _id: req.body.id });
	res.redirect("/");
});

router.post("/editItem", async (req, res) => {
	const todo = await Task.findById(req.body.id);
	const name = todo.name;
	const content = todo.content;
	const category = todo.category;
	const id = todo.id;
	res.render("editItem", {
		title: "Edit mode",
		categories,
		name,
		content,
		category,
		id,
		helpers: {
			setSelected: (item: string) => {
				if (item == category) {
					return "selected";
				}
			},
		},
	});
});

router.post("/saveChanges", async (req, res) => {
	const todo = await Task.findById(req.body.id);
	todo.name = req.body.name;
	todo.category = req.body.category;
	todo.content = req.body.content
	await todo.save();
	res.redirect("/");
});
