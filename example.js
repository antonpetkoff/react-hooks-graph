function RefinementContainer(props) {
  const {
    filterFacets,
    activeFilters,
    updateFilter,
    navigation,
    activeProductOrder,
    updateOrder,
  } = props;

  const optionsByFacet = useMemo(() => toOptionsByFacet(filterFacets), [filterFacets]);

  const [productOrder, setProductOrder] = useState(activeProductOrder);

  const [selectedByFacet, dispatch] = useReducer(filterReducer, {});

  const addFilter = useCallback((option) => {
    dispatch({ option, type: 'add' });
  }, []);

  const removeFilter = useCallback((option) => {
    dispatch({ option, type: 'remove' });
  }, []);

  const refine = useCallback(() => {
    updateOrder(productOrder);
    updateFilter(flatten(compact(Object.values(selectedByFacet))));
    navigation.navigate('Products');
    return true;
  }, [navigation, productOrder, selectedByFacet, updateFilter, updateOrder]);

  useEffect(() => dispatch({
    selected: activeFilters,
    options: optionsByFacet,
    type: 'reset',
  }), [activeFilters, optionsByFacet]);

  useBackHandler(refine);

  // return whatever JSX;
}
