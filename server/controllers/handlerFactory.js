// Delete Doc
exports.deleteOne = (Model) => async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) res.status(404).json({ error: "this doc is not existant!" });
    res.status(204).json({
      status: "success",
      data: null,
    });
  };
  
  // Update Doc
  
  exports.updateOne = (Model) => async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) res.status(404).json({ error: "this doc is not existant!" });
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };
  
  // Create Doc
  
  exports.createOne = (Model) => async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };
  
  // get Doc
  
  exports.getOne = (Model, popOptions) => async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if(popOptions) query=query.populate(popOptions);
    const doc= await query;
    if (!doc) res.status(404).json({ error: "this doc is not existant!" });
  
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };
  
  